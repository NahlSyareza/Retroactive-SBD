const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const logger = require("../tools/Logger");

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  ssl: {
    require: true,
  },
});

pool.connect().then(() => {
  logger.info("Connected to Toko backend!");
});

exports.GetFunction = async (req, res) => {
  try {
    // SQL query to select all items from the database
    const query = "SELECT * FROM toko_inventory";
    // Execute the query
    const { rows } = await pool.query(query);
    // Respond with all items
    res.json(rows);
  } catch (error) {
    // Handle error
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
  }
};

exports.CreateFunction = async (req, res) => {
  // Destructure fields from request body
  const {
    nama_toko,
    nama_album,
    nama_artis,
    jenis_media,
    harga_media,
    jumlah,
    gambar_media,
  } = req.body;
  try {
    // SQL query to insert a new item into the database
    const query =
      "INSERT INTO toko_inventory(nama_toko, nama_album, nama_artis, jenis_media, harga_media, jumlah, gambar_media) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    // Array of values to be inserted
    const values = [
      nama_toko,
      nama_album,
      nama_artis,
      jenis_media,
      harga_media,
      jumlah,
      gambar_media,
    ];
    // Execute the query with the provided values
    const { rows } = await pool.query(query, values);
    // Respond with the created item
    res.status(201).json(rows[0]);
  } catch (error) {
    // Handle error
    res
      .status(500)
      .json({ error: "An error occurred while creating an item." });
  }
};

exports.registerEvent = async (req, res) => {
  const { namaToko, emailToko, passwordToko } = req.body;
  const successMessage = `Sukses register toko ${namaToko}!`;

  try {
    const result = await pool.query(
      "INSERT INTO toko_info VALUES ($1,$2,$3,0) RETURNING *",
      [namaToko, emailToko, passwordToko]
    );

    logger.info(successMessage);
    return res.status(200).json({
      state: true,
      message: successMessage,
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

exports.loginEvent = async (req, res) => {
  const { dataToko, passwordToko } = req.query;
  const errorNotFoundMessage = "Toko tidak dapat ditemukan!";
  const successMessage = `Berhasil login toko ${dataToko}`;

  try {
    const result = await pool.query(
      "SELECT * FROM toko_info WHERE (nama_toko=$1 OR email_toko=$1) AND password_toko=$2",
      [dataToko, passwordToko]
    );

    if (result.rowCount != 1) {
      logger.info(errorNotFoundMessage);
      return res.status(201).json({
        state: false,
        message: errorNotFoundMessage,
        payload: null,
      });
    }

    logger.info(successMessage);
    return res.status(200).json({
      state: true,
      message: successMessage,
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

// Controller for READ (All items)
exports.getAllEvent = async (req, res) => {
  try {
    // SQL query to select all items from the database
    // Execute the query
    const result = await pool.query("SELECT * FROM toko_inventory");
    // Respond with all items
    res.status(200).json({
      state: true,
      message: "Berhasil menarik data",
      payload: result.rows,
    });
  } catch (error) {
    // Handle error
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
  }
};

exports.addToCart = async function addToCart(req, res) {
  const { namaUser, namaAlbum } = req.body;

  try {
    const initial = await pool.query(
      "SELECT * FROM cart WHERE nama_user=$1 AND nama_album=$2",
      [namaUser, namaAlbum]
    );

    if (initial.rowCount <= 0) {
      const result = await pool.query(
        "INSERT INTO cart VALUES ($1,$2,1) RETURNING *",
        [namaUser, namaAlbum]
      );
      logger.info("Berhasil menambahkan ke cart awal!");
      return res.status(200).json({
        state: true,
        message: "Berhasil menambahkan ke cart awal!",
        payload: result.rows[0],
      });
    }

    const middle = await pool.query(
      "SELECT jumlah FROM toko_inventory WHERE nama_album=$1",
      [namaAlbum]
    );

    const settle = await pool.query(
      "SELECT jumlah FROM cart WHERE nama_album=$1 AND nama_user=$2",
      [namaAlbum, namaUser]
    );

    if (settle.rows[0].jumlah >= middle.rows[0].jumlah) {
      logger.warn("Jumlah sudah max!");
      return res.status(201).json({
        state: false,
        message: "Jumlah sudah max!",
        payload: null,
      });
    }

    const result = await pool.query(
      "UPDATE cart SET jumlah=jumlah+1 WHERE nama_user=$1 AND nama_album=$2 RETURNING *",
      [namaUser, namaAlbum]
    );

    logger.info("Berhasil menambahkan ke cart!");
    return res.status(200).json({
      state: true,
      message: "Berhasil menambahkan ke cart!",
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ err });
  }
};

exports.subFromCart = async function subFromCart(req, res) {
  const { namaUser, namaAlbum } = req.body;

  try {
    const initial = await pool.query(
      "SELECT * FROM cart WHERE nama_user=$1 AND nama_album=$2",
      [namaUser, namaAlbum]
    );

    const initialRes = initial.rows[0];

    if (initialRes.jumlah <= 0) {
      logger.warn("Jumlah item tidak bisa negatif!");
      return res.status(201).json({
        state: false,
        message: "Jumlah item tidak bisa negatif!",
        payload: null,
      });
    }

    const result = await pool.query(
      "UPDATE cart SET jumlah=jumlah-1 WHERE nama_user=$1 AND nama_album=$2",
      [namaUser, namaAlbum]
    );

    logger.info("Berhasil mengurangi jumlah!");
    res.status(201).json({
      state: true,
      message: "Berhasil mengurangi jumlah!",
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

exports.getFromCart = async function getFromCart(req, res) {
  const { namaUser } = req.query;

  try {
    const result = await pool.query(
      "SELECT cart.nama_user,toko_inventory.nama_album,cart.jumlah AS cart_jumlah,toko_inventory.jumlah AS toko_jumlah,toko_inventory.nama_artis,toko_inventory.jenis_media,toko_inventory.harga_media,toko_inventory.gambar_media FROM toko_inventory JOIN cart ON toko_inventory.nama_album IN (SELECT nama_album FROM cart WHERE nama_user=$1) AND cart.nama_user=$1 AND toko_inventory.nama_album=cart.nama_album;",
      [namaUser]
    );

    logger.info("Tipis manis kucoba beli-beli");
    return res.status(200).json({
      state: true,
      message: "Tipis manis kucoba beli-beli",
      payload: result.rows,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

// Removes an item
exports.removeFromCart = async function removeFromCart(req, res) {
  const { namaUser, namaAlbum } = req.query;

  try {
    const result = await pool.query(
      "DELETE FROM cart WHERE nama_user=$1 AND nama_album=$2",
      [namaUser, namaAlbum]
    );

    if (!result) {
      logger.warn("Barang tidak dapat ditemukan!");
      return res.status(201).json({
        state: false,
        message: "Barang tidak dapat ditemukan!",
        payload: null,
      });
    }

    logger.info("Barang berhasil dihapus!");
    return res.status(200).json({
      state: true,
      message: "Barang berhasil dihapus!",
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

exports.subFromInventory = async (req, res) => {
  const { namaUser } = req.body;
  const successMessage = "Berhasil dikurangi!";
  const warnAmountMessage = "Jumlah beli tidak bisa melebihi stok toko!";

  try {
    const initial = await pool.query(
      "SELECT cart.nama_album,cart.jumlah AS cart_jumlah,toko_inventory.nama_album,toko_inventory.jumlah AS toko_jumlah FROM toko_inventory JOIN cart ON cart.nama_album=toko_inventory.nama_album AND cart.nama_user=$1;",
      [namaUser]
    );

    const initialRes = initial.rows;

    for (let i = 0; i < initial.rowCount; i++) {
      if (initialRes[i].cart_jumlah > initialRes[i].toko_jumlah) {
        logger.warn(warnAmountMessage);
        return res.status(200).json({
          state: false,
          message: warnAmountMessage,
          payload: null,
        });
      }
    }

    const result = await pool.query(
      "WITH tr (nama_album,jumlah) AS (SELECT nama_album,jumlah FROM cart WHERE nama_user=$1) UPDATE toko_inventory SET jumlah=jumlah-(SELECT jumlah FROM tr WHERE tr.nama_album=toko_inventory.nama_album) WHERE nama_album IN (SELECT nama_album FROM tr) RETURNING *;",
      [namaUser]
    );

    const next = await pool.query("DELETE FROM cart WHERE nama_user=$1", [
      namaUser,
    ]);

    logger.info(successMessage);
    return res.status(200).json({
      state: true,
      message: successMessage,
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

// Controller for READ (Detail)
exports.getById = async (req, res) => {
  try {
    // SQL query to select an item by id
    const query = "SELECT * FROM toko_inventory WHERE id = $1";
    // Execute the query with the id from request parameters
    const { rows } = await pool.query(query, [req.params.id]);
    // Check if item is found
    if (rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    // Respond with the found item
    res.status(200).json({
      state: true,
      message: "Berhasil mendapatkan media!",
      payload: rows[0],
    });
  } catch (error) {
    // Handle error
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
  }
};

exports.addInventoryJumlah = async (req, res) => {
  const { namaAlbum } = req.body;
  const successMessage = "Berhasil menambahkan ke inventory toko!";

  try {
    const result = await pool.query(
      "UPDATE toko_inventory SET jumlah=jumlah+1 WHERE nama_album=$1 RETURNING *",
      [namaAlbum]
    );

    logger.info(successMessage);
    return res.status(200).json({
      state: true,
      message: successMessage,
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

exports.subInventoryJumlah = async (req, res) => {
  const { namaAlbum } = req.body;
  const successMessage = "Berhasil menambahkan ke inventory toko!";
  const warnNoNegativeMessage = "Jumlah tidak bisa negatif!";

  try {
    const initial = await pool.query(
      "SELECT jumlah FROM toko_inventory WHERE nama_album=$1",
      [namaAlbum]
    );

    if (initial.rows[0].jumlah <= 1) {
      logger.warn(warnNoNegativeMessage);
      return res.status(201).json({
        state: false,
        message: warnNoNegativeMessage,
        payload: null,
      });
    }

    const result = await pool.query(
      "UPDATE toko_inventory SET jumlah=jumlah-1 WHERE nama_album=$1 RETURNING *",
      [namaAlbum]
    );

    logger.info(successMessage);
    return res.status(200).json({
      state: true,
      message: successMessage,
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

// Controller for UPDATE
exports.UpdateFunction = async (req, res) => {
  // Destructure fields from request body
  const {
    id,
    nama_toko,
    nama_album,
    nama_artis,
    jenis_media,
    harga_media,
    jumlah,
    gambar_media,
  } = req.body;
  try {
    // SQL query to update an item by id
    const query = `
      UPDATE toko_inventory 
      SET nama_toko = $1, 
          nama_album = $2, 
          nama_artis = $3, 
          jenis_media = $4, 
          harga_media = $5, 
          jumlah = $6, 
          gambar_media = $7 
      WHERE id = $8 
      RETURNING *;
    `;
    // Array of values to update
    const values = [
      nama_toko,
      nama_album,
      nama_artis,
      jenis_media,
      harga_media,
      jumlah,
      gambar_media,
      id,
    ];
    // Execute the query with the provided values
    const { rows } = await pool.query(query, values);
    // Check if item is found
    if (rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    // Respond with the updated item
    res.json(rows[0]);
  } catch (error) {
    // Handle error
    res
      .status(500)
      .json({ error: "An error occurred while updating the data." });
  }
};

// Controller for DELETE
exports.DeleteFunction = async (req, res) => {
  try {
    // SQL query to delete an item by id
    const query = "DELETE FROM toko_inventory WHERE id = $1 RETURNING *";
    // Execute the query with the id from request parameters
    const { rows } = await pool.query(query, [req.params.id]);
    // Check if item is found
    if (rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    // Respond with the deleted item
    res.json(rows[0]);
  } catch (error) {
    // Handle error
    res
      .status(500)
      .json({ error: "An error occurred while deleting the data." });
  }
};
