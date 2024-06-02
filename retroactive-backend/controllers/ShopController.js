// Importing the Pool class from the pg package to handle connections to the PostgreSQL database.
const { Pool } = require("pg");
// Import bcrypt for password hashing.
const bcrypt = require("bcrypt");

// Creating a connection pool to manage and reuse PostgreSQL database connections.
const pool = new Pool({
  user: process.env.PGUSER, // Username for the PostgreSQL database from environment variables.
  password: process.env.PGPASSWORD, // Password for the database from environment variables.
  host: process.env.PGHOST, // Database host address from environment variables.
  database: process.env.PGDATABASE, // Database name from environment variables.
  ssl: {
    require: true, // Enforcing SSL to secure the database connections.
  },
});

// Establishing a connection to the database and logging a confirmation message.
pool.connect().then(() => {
  console.log("Connected to Postgres Server!");
});

// Controller for CREATE
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
