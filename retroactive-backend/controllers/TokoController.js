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
      data: result.rows,
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
    const result = await pool.query(
      "INSERT INTO cart VALUES ($1,$2) RETURNING *",
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
    return res.statues(500).json({ err });
  }
};

// Controller for READ (Detail)
exports.GetDetailFunction = async (req, res) => {
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
    res.json(rows[0]);
  } catch (error) {
    // Handle error
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
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
