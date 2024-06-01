const { Pool } = require("pg");
const bcrypt = require("bcrypt");

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
  console.log("Connected to Postgres Server!");
});

exports.registerEvent = async function registerEvent(req, res) {
  const { namaUser, emailUser, passwordUser } = req.body;
  const hashedPassword = await bcrypt.hash(passwordUser, 10);
  try {
    const result = await pool.query(
      "INSERT INTO user_info (nama_user, email_user, password_user, saldo_user) VALUES ($1, $2, $3, 0) RETURNING *",
      [namaUser, emailUser, hashedPassword]
    );

    if (!result) {
      res.status(201).json({
        state: false,
        message: "Nama atau email sudah diambil!",
        data: null,
      });
    }

    res.status(200).json({
      state: true,
      message: "Register akun " + namaUser + " berhasil",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loginEvent = async function loginEvent(req, res) {
  const { dataUser, passwordUser } = req.body;
  let error = "The account that you've entered is not valid.";

  try {
    const result = await pool.query(
      "SELECT * FROM user_info WHERE email_user=$1 OR nama_user=$1",
      [dataUser]
    );

    if (result.rowCount <= 0) {
      res.status(401).json({
        message: "The user with email entered is not found.",
        error: error,
      });
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(passwordUser, user.password_user);
    if (!match) {
      return res
        .status(401)
        .json({ message: "The password is not correct.", error: error });
    }
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getEvent = async function getEvent(req, res) {
  const { namaUser } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM user_info WHERE nama_user=$1",
      [namaUser]
    );

    if (result.rowCount <= 0) {
      return res.status(201).json({
        state: false,
        message: "Account tidak berhasil didapatkan!",
        data: result.rows,
      });
    }

    return res.status(200).json({
      state: true,
      message: "Akun berhasil didapatkan!",
      data: result.rows,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getAllEvent = async function getAllEvent(req, res) {
  try {
    const result = await pool.query("SELECT * FROM user_info");

    return res.status(200).json({
      message: "Semua akun berhasil didapatkan!",
      data: result.rows,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.editEvent = async function editEvent(req, res) {
  const { newName, userEmail, newPassword } = req.body;
  let error = "The email that you've entered is not valid.";

  try {
    const result = await pool.query(
      "SELECT * FROM user_info WHERE email_user = $1",
      [userEmail]
    );

    if (result.rowCount <= 0) {
      res.status(401).json({ error: error });
    }

    const user = result.rows[0];

    if (newName !== undefined) user.nama_user = newName;
    if (newPassword !== undefined)
      user.password_user = await bcrypt.hash(newPassword, 10);

    // Execute an SQL query to update the user's details in the user_info table and return the updated row.
    const insert = await pool.query(
      "UPDATE user_info SET nama_user = $1, password_user = $2 WHERE email_user = $3 RETURNING *",
      [user.nama_user, user.password_user, userEmail]
    );
    // Respond with a 200 OK status and the updated user data.
    res.status(200).json({ data: insert.rows });
  } catch (err) {
    // If an error occurs during processing, respond with a 500 Internal Server Error.
    res.status(500).json(err);
  }
};

// Define an asynchronous function to handle balance top-up requests for a user.
exports.topUpEvent = async function topUpEvent(req, res) {
  const { balance, emailUser } = req.body; // Extract the balance and user email from the request body.
  let error = "The email that you've entered is not valid."; // Error message for invalid email.
  let noBalance = "Invalid balance because it's negative."; // Error message for negative balance input.

  try {
    // Execute an SQL query to find the user by email.
    const result = await pool.query(
      "SELECT * FROM user_info WHERE email_user = $1",
      [emailUser]
    );

    // Check if any user data was found.
    if (result.rowCount < 0) {
      // If no user data is found, respond with a 401 Unauthorized status and an error message.
      res.status(401).json({ error: error });
    }

    // Retrieve the first row from the result as the user to update.
    const user = result.rows[0];

    // Validate the provided balance to ensure it is not negative.
    if (balance <= 0) {
      // If the balance is negative, respond with a 400 Bad Request status and the corresponding error message.
      res.status(400).json({ error: noBalance });
    }

    // Update the user's saldo_user field with the provided balance.
    user.saldo_user = balance;

    // Execute an SQL query to update the user's saldo in the user_info table and return the updated row.
    const insert = await pool.query(
      "INSERT INTO user_info (email_user, saldo_user) VALUES ($1, $2) RETURNING *",
      [user.email_user, user.saldo_user]
    );
    // Respond with a 200 OK status and the updated balance data.
    res.status(200).json({ data: insert.rows });
  } catch (err) {
    // If an error occurs during processing, respond with a 500 Internal Server Error.
    res.status(500).json(err);
  }
};

// Define an asynchronous function to handle requests for retrieving a user's inventory.
exports.inventoryFunction = async function inventoryFunction(req, res) {
  const { emailUser } = req.body; // Extract the user's email from the request body.
  let error = "The email that you've entered is not valid."; // Error message for invalid email.

  try {
    // Execute an SQL query to find the user by email and retrieve their inventory.
    const result = await pool.query(
      "SELECT * FROM user_info WHERE email_user = $1",
      [emailUser]
    );

    // Check if any user data was found.
    if (result.rowCount <= 0) {
      // If no user data is found, respond with a 401 Unauthorized status and an error message.
      res.status(401).json({ error: error });
    }

    // Retrieve the inventory information from the first row of the result.
    const user = result.rowCount[0];
    // Respond with a 200 OK status and the user's inventory data.
    res.status(200).json({ data: user.inventory_user });
  } catch (err) {
    // If an error occurs during processing, respond with a 500 Internal Server Error.
    res.status(500).json(err);
  }
};

// Define an asynchronous function to handle deletion of a user from the database.
exports.deleteEvent = async function deleteEvent(req, res) {
  const { emailUser } = req.body; // Extract user email from the request body.

  try {
    // Execute an SQL query to delete the user matching the provided email.
    const result = await pool.query(
      "DELETE FROM user_info WHERE email_user = $1 RETURNING *",
      [emailUser]
    );
    if (result.rowCount <= 0) {
      // Check if any rows were affected by the deletion query.
      // If no rows were affected, the user with the provided email was not found.
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" }); // If the user was successfully deleted, respond with a success message.
  } catch (err) {
    res.status(500).json({ error: err.message }); // If an error occurs during the deletion process, respond with a 500 Internal Server Error.
  }
};
