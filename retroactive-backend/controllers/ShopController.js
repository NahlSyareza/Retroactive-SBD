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

// Function to handle adding a new shop. It uses the data provided in the request body.
exports.addShop = async function addShop(req, res) {
  const { shopName, shopEmail, shopPassword } = req.body; // Extracting shop details from the request body.
  const hashedPassword = await bcrypt.hash(shopPassword, 10); // Hash the password before storing
  try {
    // Inserting the new shop's details into the 'toko' table and returning the newly created row.
    const result = await pool.query(
      "INSERT INTO toko (nama_toko, email_toko, password_toko, saldo_text) VALUES ($1, $2, $3, 0) RETURNING *",
      [shopName, shopEmail, hashedPassword]
    );
    res.status(201).json({ data: result.rows }); // Responding with the created shop data.
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handling errors and responding with a server error status.
  }
};

// Function to handle editing existing shop details based on the shop's email.
exports.editShop = async function editShop(req, res) {
  const { newShopName, newShopPassword, shopEmail } = req.body; // Extracting new shop details and identifying email from the request body.
  let error = "The email that you've entered is not valid."; // Error message for non-existent email.

  try {
    // Retrieving the shop based on email to check existence before update.
    const result = await pool.query(
      "SELECT * FROM toko WHERE email_toko = $1",
      [shopEmail]
    );

    if (result.rowCount <= 0) {
      // Condition when no shops match the email.
      res.status(404).json({ error: error });
    } else {
      const shop = result.rows[0]; // Storing the retrieved shop data.

      // Updating shop details if provided.
      if (newShopName !== undefined) shop.nama_toko = newShopName;
      if (newShopPassword !== undefined) shop.password_toko = newShopPassword;

      // Inserting updated shop details back into the database.
      const insert = await pool.query(
        "UPDATE toko SET nama_toko = $1, password_toko = $2 WHERE email_toko = $3 RETURNING *",
        [shop.nama_toko, shop.password_toko, shopEmail]
      );
      res
        .status(200)
        .json({ message: "Shop updated successfully", data: insert.rows[0] }); // Responding with the updated shop data.
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handling errors and responding with a server error status.
  }
};

// Function to reset the password for a shop
exports.resetShopPassword = async function resetShopPassword(req, res) {
  const { shopEmail, shopNewPassword } = req.body; // Extract email and new password from the request body.
  let error = "The email that you've entered is not valid."; // Error message if no user found.
  const hashedPassword = await bcrypt.hash(shopNewPassword, 10); // Hash the new password using bcrypt with 10 rounds.

  try {
    // Attempt to update the shop's password in the database where the email matches.
    const result = await pool.query(
      "UPDATE toko SET password_toko = $1 WHERE email_toko = $2 RETURNING *",
      [hashedPassword, shopEmail]
    );
    // Check if any rows were updated.
    if (result.rowCount <= 0) {
      res.status(404).json({ error: error });
    }
    // If update is successful, send back a success message.
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    // Catch and return any errors during the process.
    res.status(500).json({ error: err.message });
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
    res.status(201).json({ data: result.rows }); // Responding with the added inventory data.
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handling errors and responding with a server error status.
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

    if (result.rowCount <= 0) {
      // Checking if the shop exists.
      res.status(404).json({ error: error });
    } else {
      const shop = result.rows[0]; // Storing the retrieved inventory data.

      // Conditionally updating inventory fields if new values are provided.
      if (newShopAlbum !== undefined) shop.nama_album = newShopAlbum;
      if (newShopArtist !== undefined) shop.nama_artis = newShopArtist;
      if (newShopLabel !== undefined) shop.nama_label = newShopLabel;
      if (newMediaType !== undefined) shop.jenis_media = newMediaType;
      if (newMediaPrice !== undefined) shop.harga_media = newMediaPrice;

      // Reinserting the updated inventory details back into the database.
      const insert = await pool.query(
        "UPDATE toko_inventory SET nama_album = $1, nama_artis = $2, nama_label = $3, jenis_media = $4, harga_media = $5 WHERE nama_toko = $6 RETURNING *",
        [
          shop.nama_album,
          shop.nama_artis,
          shop.nama_label,
          shop.jenis_media,
          shop.harga_media,
          shopName,
        ]
      );
      res
        .status(200)
        .json({ message: "Inventory updated successfully", data: insert.rows }); // Responding with the updated inventory data.
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handling errors and responding with a server error status.
  }
};

// Function to delete a shop based on its email
exports.deleteShop = async function deleteShop(req, res) {
  const { shopEmail } = req.body; // Extracting the shop email from the request body

  try {
    // Executing a query to delete the shop based on the email and returning the deleted shop data.
    const result = await pool.query(
      "DELETE FROM toko WHERE email_toko = $1 RETURNING *",
      [shopEmail]
    );
    // If no shop is deleted, it means the email was not found.
    if (result.rowCount <= 0) {
      res
        .status(404)
        .json({ error: "The email that you've entered is not valid." }); // Sending an error message if the email is not valid.
    }
    res
      .status(200)
      .json({ message: "Shop deleted successfully!", data: result.rows }); // Sending a message if the shop was deleted successfully.
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handling errors and responding with a server error status.
  }
};

// Function to search shops by name.
exports.searchShopByName = async function searchShopByName(req, res) {
  // Extracting the shop name from the query parameters of the request.
  const { shopName } = req.query;

  try {
    // Executing the SQL query to search for shops with a name matching the provided shopName, case-insensitive.
    const result = await pool.query(
      "SELECT * FROM toko WHERE nama_toko ILIKE $1", // SQL query to search for matching shop names.
      [`%${shopName}%`]
    );
    if (result.rowCount <= 0) {
      // If no shops are found, it will give an error message.
      return res
        .status(404)
        .json({ error: "No shops found matching the criteria." });
    }
    res.status(200).json({ data: result.rows }); // If shops are found, it will return the found shop data.
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handling any errors that occur during the query execution.
  }
};

// Function to get shop details by email.
exports.getShopDetails = async function getShopDetails(req, res) {
  // Extract the shopEmail from request parameters.
  const { shopEmail } = req.params;

  try {
    // Execute a SQL query to select all columns from the 'toko' table where the 'email_toko' matches the provided email.
    const result = await pool.query(
      "SELECT * FROM toko WHERE email_toko = $1",
      [shopEmail]
    );
    // Check if the query returned any rows.
    if (result.rowCount <= 0) {
      return res.status(404).json({ error: "Shop not found." }); // If no rows are returned, send an error message.
    }
    res.status(200).json({ data: result.rows }); // If rows are found, send the rows in the response.
  } catch (err) {
    res.status(500).json({ error: err.message }); // If an error occurs during query execution, send an error message.
  }
};
