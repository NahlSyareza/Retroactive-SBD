// Importing the Pool class from the pg package to handle connections to the PostgreSQL database.
const { Pool } = require("pg");

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

// Function to handle adding a new shop. It uses the data provided in the request body.
exports.addShop = async function addShop(req, res) {
  const { shopName, shopEmail, shopPassword } = req.body; // Extracting shop details from the request body.

  try {
    // Inserting the new shop's details into the 'toko' table and returning the newly created row.
    const result = await pool.query(
      "INSERT INTO toko (nama_toko, email_toko, password_toko, saldo_text) VALUES ($1, $2, $3, 0) RETURNING *",
      [shopName, shopEmail, shopPassword]
    );
    res.status(201).json({ data: result }); // Responding with the created shop data.
  } catch (err) {
    res.status(500).json(err); // Handling errors and responding with a server error status.
  }
};

// Function to handle editing existing shop details based on the shop's email.
exports.editShop = async function editShop(req, res) {
  const { newShopName, newShopEmail, newShopPassword, shopEmail } = req.body; // Extracting new shop details and identifying email from the request body.
  let error = "The email that you've entered is not valid."; // Error message for non-existent email.

  try {
    // Retrieving the shop based on email to check existence before update.
    const result = await pool.query(
      "SELECT * FROM toko WHERE email_toko = $1",
      [shopEmail]
    );

    if (result.rowCount < 0) {
      // Condition when no shops match the email.
      res.status(401).json({ error: error });
    } else {
      const shop = result.rows[0]; // Storing the retrieved shop data.

      // Updating shop details if provided.
      if (newShopName != undefined) shop.nama_toko = newShopName;
      if (newShopEmail != undefined) shop.email_toko = newShopEmail;
      if (newShopPassword != undefined) shop.password_toko = newShopPassword;

      // Inserting updated shop details back into the database.
      const insert = await pool.query(
        "INSERT INTO toko (nama_toko, email_toko, password_toko) VALUES ($1, $2, $3) RETURNING *",
        [shop.nama_toko, shop.email_toko, shop.password_toko]
      );
      res.status(201).json({ data: insert }); // Responding with the updated shop data.
    }
  } catch (err) {
    res.status(500).json(err); // Handling errors and responding with a server error status.
  }
};

// Function to handle adding inventory items associated with a specific shop.
exports.addInventory = async function addInventory(req, res) {
  const { shopName, shopAlbum, shopArtist, shopLabel, mediaType, mediaPrice } =
    req.body; // Extracting inventory details from the request body.

  try {
    // Inserting new inventory items into the 'toko_inventory' table and returning the created entries.
    const result = await pool.query(
      "INSERT INTO toko_inventory (nama_toko, nama_album, nama_artis, nama_label, jenis_media, harga_media) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [shopName, shopAlbum, shopArtist, shopLabel, mediaType, mediaPrice]
    );
    res.status(201).json({ data: result }); // Responding with the added inventory data.
  } catch (err) {
    res.status(500).json(err); // Handling errors and responding with a server error status.
  }
};

// Function to handle editing existing inventory details associated with a shop.
exports.editInventory = async function editInventory(req, res) {
  const {
    shopName,
    newShopAlbum,
    newShopArtist,
    newShopLabel,
    newMediaType,
    newMediaPrice,
  } = req.body; // Extracting updated inventory details and the shop identifier from the request body.
  let error = "The shop name that you've entered is not valid."; // Error message for non-existent shop name.

  try {
    // Selecting existing inventory items to be updated.
    const result = await pool.query(
      "SELECT * FROM toko_inventory WHERE nama_toko = $1",
      [shopName]
    );

    if (result.rowCount < 0) {
      // Checking if the shop exists.
      res.status(401).json({ error: error });
    } else {
      const shop = result.rows[0]; // Storing the retrieved inventory data.

      // Conditionally updating inventory fields if new values are provided.
      if (newShopAlbum != undefined) shop.nama_album = newShopAlbum;
      if (newShopArtist != undefined) shop.nama_artis = newShopArtist;
      if (newShopLabel != undefined) shop.nama_label = newShopLabel;
      if (newMediaType != undefined) shop.jenis_media = newMediaType;
      if (newMediaPrice != undefined) shop.harga_media = newMediaPrice;

      // Reinserting the updated inventory details back into the database.
      const insert = await pool.query(
        "INSERT INTO toko_inventory (nama_album, nama_artis, nama_label, jenis_media, harga_media) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          shop.nama_album,
          shop.nama_artis,
          shop.nama_label,
          shop.jenis_media,
          shop.harga_media,
        ]
      );
      res.status(201).json({ data: insert }); // Responding with the updated inventory data.
    }
  } catch (err) {
    res.status(500).json(err); // Handling errors and responding with a server error status.
  }
};
