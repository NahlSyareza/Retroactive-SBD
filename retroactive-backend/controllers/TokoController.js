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

// Function to register a new store ("toko") in the database.
exports.registerEvent = async (req, res) => {
  const { namaToko, emailToko, passwordToko } = req.body;  // Extract store information from the request body.
  const successMessage = `Sukses register toko ${namaToko}!`;  // Success message template.

  try {
    // Inserts the new store information into the 'toko_info' table in the database.
    // The query includes placeholder values ($1, $2, $3) that will be replaced by the actual data provided.
    // '0' at the end represents an initial state or value for a new column (could be balance, status, etc.).
    const result = await pool.query(
      "INSERT INTO toko_info VALUES ($1,$2,$3,0) RETURNING *",
      [namaToko, emailToko, passwordToko]
    );

    logger.info(successMessage);  // Log the success message to the server's console or log file.
    // Responds to the client with a successful HTTP status and the message, including the data of the newly created store.
    return res.status(200).json({
      state: true,
      message: successMessage,
      payload: result.rows[0],
    });
  } catch (err) {
    // Log the error and respond with a server error HTTP status.
    logger.error(err);  // Log the error to the server's console or log file.
    return res.status(500).json({
      state: false,  
      message: err,  
      payload: null,  
    });
  }
};


// Function to add a new item to the inventory in the database.
exports.addItemEvent = async (req, res) => {
  // Extract item details from the request body.
  const {
    namaToko,
    namaAlbum,
    namaArtis,
    jenisMedia,
    hargaMedia,
    jumlah,
    gambarMedia,
  } = req.body;

  // Success message to indicate addition of the item.
  const successMessage = `Berhasil menambahkan ${namaAlbum}, ${namaArtis}`;

  try {
    // Insert the new item into the 'toko_inventory' table and return the newly created entry.
    const result = await pool.query(
      "INSERT INTO toko_inventory VALUES ($1, $2, $3, $4, $5, $6, default, $7) RETURNING *",
      [
        namaToko,
        namaAlbum,
        namaArtis,
        jenisMedia,
        hargaMedia,
        jumlah,
        gambarMedia,
      ]
    );

    // Log the success message and return a successful response with the new item data.
    logger.info(successMessage);
    return res.status(200).json({
      state: true,
      message: successMessage,
      payload: result.rows[0],
    });
  } catch (err) {
    // Log any errors and return an error response.
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

// Function to add an item to a user's cart in the database.
exports.addToCart = async function addToCart(req, res) {
  const { namaUser, namaAlbum } = req.body;  // Extract the user name and album name from request body.

  try {
    // Check if the item is already in the user's cart.
    const initial = await pool.query(
      "SELECT * FROM cart WHERE nama_user=$1 AND nama_album=$2",
      [namaUser, namaAlbum]
    );

    // If not already in the cart, insert it with a quantity of 1.
    if (initial.rowcount <= 0) {
      const result = await pool.query(
        "INSERT INTO cart VALUES ($1, $2, 1) RETURNING *",
        [namaUser, namaAlbum]
      );
      logger.info("Berhasil menambahkan ke cart awal!");  // Log the addition.
      return res.status(200).json({
        state: true,
        message: "Berhasil menambahkan ke cart awal!",
        payload: result.rows[0],
      });
    }

    // Check available stock in inventory.
    const middle = await pool.query(
      "SELECT jumlah FROM toko_inventory WHERE nama_album=$1",
      [namaAlbum]
    );

    // Check current quantity in the cart.
    const settle = await pool.query(
      "SELECT jumlah FROM cart WHERE nama_album=$1 AND nama_user=$2",
      [namaAlbum, namaUser]
    );

    // If cart quantity reaches inventory limits, prevent addition.
    if (settle.rows[0].jumlah >= middle.rows[0].jumlah) {
      logger.warn("Jumlah sudah max!");  // Log that max quantity is reached.
      return res.status(201).json({
        state: false,
        message: "Jumlah sudah max!",
        payload: null,
      });
    }

    // If under limit, increase the cart quantity by 1.
    const result = await pool.query(
      "UPDATE cart SET jumlah=jumlah+1 WHERE nama_user=$1 AND nama_album=$2 RETURNING *",
      [namaUser, namaAlbum]
    );

    logger.info("Berhasil menambahkan ke cart!");  // Log successful addition.
    return res.status(200).json({
      state: true,
      message: "Berhasil menambahkan ke cart!",
      payload: result.rows[0],
    });
  } catch (err) {
    // Log errors and return a server error status.
    logger.error(err);
    return res.status(500).json({ err });
  }
};

// Function to decrease the quantity of an item in a user's cart.
exports.subFromCart = async function subFromCart(req, res) {
  const { namaUser, namaAlbum } = req.body; // Extract user and album information from the request body.

  try {
    // Check current quantity of the specified item in the cart.
    const initial = await pool.query(
      "SELECT * FROM cart WHERE nama_user=$1 AND nama_album=$2",
      [namaUser, namaAlbum]
    );

    const initialRes = initial.rows[0]; // Store the current item details from the cart.

    // Prevent the item quantity from going negative.
    if (initialRes.jumlah <= 0) {
      logger.warn("Jumlah item tidak bisa negatif!"); // Log a warning if trying to reduce below zero.
      return res.status(201).json({
        state: false,
        message: "Jumlah item tidak bisa negatif!",
        payload: null,
      });
    }

    // If quantity is above zero, decrease it by one.
    const result = await pool.query(
      "UPDATE cart SET jumlah=jumlah-1 WHERE nama_user=$1 AND nama_album=$2",
      [namaUser, namaAlbum]
    );

    logger.info("Berhasil mengurangi jumlah!"); // Log the successful decrement.
    res.status(201).json({
      state: true,
      message: "Berhasil mengurangi jumlah!",
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err); // Log any errors that occur during the process.
    res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

// Function to retrieve the contents of a user's cart, including details from the inventory.
exports.getFromCart = async function getFromCart(req, res) {
  const { namaUser } = req.query; // Extract the user name from the request query.

  try {
    // fetches details of each item the user has in their cart.
    const result = await pool.query(
      "SELECT cart.nama_user, toko_inventory.nama_album, cart.jumlah AS cart_jumlah, toko_inventory.jumlah AS toko_jumlah, toko_inventory.nama_artis, toko_inventory.jenis_media, toko_inventory.harga_media, toko_inventory.gambar_media FROM toko_inventory JOIN cart ON toko_inventory.nama_album IN (SELECT nama_album FROM cart WHERE nama_user=$1) AND cart.nama_user=$1 AND toko_inventory.nama_album=cart.nama_album;",
      [namaUser]
    );

    logger.info("Tipis manis kucoba beli-beli"); // Log a message indicating successful retrieval.
    // Respond with the details of the items in the cart.
    return res.status(200).json({
      state: true,
      message: "Tipis manis kucoba beli-beli",
      payload: result.rows,
    });
  } catch (err) {
    logger.error(err); // Log any errors encountered during the database query.
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};


// Function to remove an item from a user's cart.
exports.removeFromCart = async function removeFromCart(req, res) {
  const { namaUser, namaAlbum } = req.query; // Extract user and album information from the request query.

  try {
    // Execute a DELETE query to remove the specified item from the user's cart.
    const result = await pool.query(
      "DELETE FROM cart WHERE nama_user=$1 AND nama_album=$2",
      [namaUser, namaAlbum]
    );

    // If the query does not return any rows, it means the item was not found in the cart.
    if (!result) {
      logger.warn("Barang tidak dapat ditemukan!"); // Log a warning if the item is not found.
      return res.status(201).json({
        state: false,
        message: "Barang tidak dapat ditemukan!",
        payload: null,
      });
    }

    logger.info("Barang berhasil dihapus!"); // Log the successful deletion.
    return res.status(200).json({
      state: true,
      message: "Bar andit successfully deleted!",
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err); // Log any errors that occur.
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};


// Function to deduct purchased items from inventory after a sale.
exports.subFromInventory = async (req, res) => {
  const { namaUser } = req.body; // Extract the user's name from the request body.

  try {
    // Retrieve cart and inventory data to ensure sale does not exceed available stock.
    const initial = await pool.query(
      "SELECT cart.nama_album, cart.jumlah AS cart_jumlah, toko_inventory.nama_album, toko_inventory.jumlah AS toko_jumlah FROM toko_inventory JOIN cart ON cart.nama_album=toko_inventory.nama_album AND cart.nama_user=$1;",
      [namaUser]
    );
    const initialRes = initial.rows;

    // Check if the cart quantity exceeds inventory stock.
    for (let i = 0; i < initial.rowCount; i++) {
      if (initialRes[i].cart_jumlah > initialRes[i].toko_jumlah) {
        logger.warn("Jumlah beli tidak bisa melebihi stok toko!"); // Warn if attempting to buy more than in stock.
        return res.status(200).json({
          state: false,
          message: "Jumlah beli tidak bisa melebihi stok toko!",
          payload: null,
        });
      }
    }

    // If quantities are valid, update inventory and clear cart.
    const result = await pool.query(
      "WITH tr (nama_album, jumlah) AS (SELECT nama_album, jumlah FROM cart WHERE nama_user=$1) UPDATE toko_inventory SET jumlah=jumlah-(SELECT jumlah FROM tr WHERE tr.nama_album=toko_inventory.nama_album) WHERE nama_album IN (SELECT nama_album FROM tr) RETURNING *;",
      [namaUser]
    );
    const next = await pool.query("DELETE FROM cart WHERE nama_user=$1", [namaUser]); // Clear the user's cart after updating inventory.

    logger.info("Berhasil dikurangi!"); // Log the successful inventory update.
    return res.status(200).json({
      state: true,
      message: "Berhasil dikurangi!",
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err); // Log any errors and respond with error status.
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

// Function to increment the stock quantity of a specific album in the inventory.
exports.addInventoryJumlah = async (req, res) => {
  const { namaAlbum } = req.body; // Extract the album name from the request body.

  try {
    // Update the inventory by increasing the quantity of the specified album.
    const result = await pool.query(
      "UPDATE toko_inventory SET jumlah=jumlah+1 WHERE nama_album=$1 RETURNING *",
      [namaAlbum]
    );

    logger.info("Berhasil menambahkan ke inventory toko!"); // Log a success message.
    // Respond with a success status and include the updated record.
    return res.status(200).json({
      state: true,
      message: "Berhasil menambahkan ke inventory toko!",
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err); // Log and handle errors.
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

// Function to decrement the stock quantity of a specific album in the inventory without going negative.
exports.subInventoryJumlah = async (req, res) => {
  const { namaAlbum } = req.body; // Extract the album name from the request body.

  try {
    // First, check the current stock to ensure it does not go negative.
    const initial = await pool.query(
      "SELECT jumlah FROM toko_inventory WHERE nama_album=$1",
      [namaAlbum]
    );

    // If stock is already at or below the minimum, log a warning and prevent decrement.
    if (initial.rows[0].jumlah <= 1) {
      logger.warn("Jumlah tidak bisa negatif!"); // Warn that the stock can't go negative.
      return res.status(201).json({
        state: false,
        message: "Jumlah tidak bisa negatif!",
        payload: null,
      });
    }

    // Update the inventory by decrementing the quantity of the specified album.
    const result = await pool.query(
      "UPDATE toko_inventory SET jumlah=jumlah-1 WHERE nama_album=$1 RETURNING *",
      [namaAlbum]
    );

    logger.info("Berhasil menambahkan ke inventory toko!"); // Log the successful decrement.
    // Respond with a success status and include the updated record.
    return res.status(200).json({
      state: true,
      message: "Berhasil menambahkan ke inventory toko!",
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err); // Log and handle errors.
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
