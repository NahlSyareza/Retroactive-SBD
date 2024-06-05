const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const logger = require("../tools/Logger");
const { log } = require("winston");

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
  logger.info("Connected to User backend!");
});

exports.registerEvent = async function registerEvent(req, res) {
  const { namaUser, emailUser, passwordUser } = req.body;
  const hashedPassword = await bcrypt.hash(passwordUser, 10);
  try {
    if (
      namaUser.length == 0 ||
      emailUser.length == 0 ||
      passwordUser.length == 0
    ) {
      logger.warn("Semua field harus diisi!");
      return res.status(201).json({
        state: false,
        message: "Semua field harus diisi!",
        payload: null,
      });
    } else {
      if (passwordUser.length < 8) {
        logger.warn("Password harus lebih dari 8 karakter!");
        return res.status(201).json({
          state: false,
          message: "Password harus lebih dari 8 karakter!",
          payload: null,
        });
      }
    }

    const initial = await pool.query(
      "SELECT * FROM user_info WHERE nama_user=$1 OR email_user=$2",
      [namaUser, emailUser]
    );

    const initialRes = initial.rowCount;

    if (initialRes != 0) {
      logger.warn("Nama atau email sudah diambil!");
      return res.status(201).json({
        state: false,
        message: "Nama atau email sudah diambil!",
        payload: null,
      });
    }

    const result = await pool.query(
      "INSERT INTO user_info (nama_user, email_user, password_user, saldo_user) VALUES ($1, $2, $3, 0) RETURNING *",
      [namaUser, emailUser, hashedPassword]
    );

    logger.info("Register akun " + namaUser + " berhasil");
    return res.status(200).json({
      state: true,
      message: "Register akun " + namaUser + " berhasil",
      payload: result.rows,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json(err);
  }
};

exports.loginEvent = async function loginEvent(req, res) {
  const { dataUser, passwordUser } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM user_info WHERE email_user=$1 OR nama_user=$1",
      [dataUser]
    );

    if (result.rowCount <= 0) {
      logger.warn("User tidak dapat ditemukan!");
      return res.status(201).json({
        state: false,
        message: "User tidak dapat ditemukan",
        payload: null,
      });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(passwordUser, user.password_user);
    if (!match) {
      logger.warn("Data dan password tidak tepat!");
      return res.status(201).json({
        state: false,
        message: "Data dan password tidak tepat!",
        payload: result.rows[0],
      });
    }

    logger.info("User berhasil login");
    return res
      .status(200)
      .json({ state: true, message: "User berhasil login", payload: user });
  } catch (err) {
    logger.error(err);
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
      logger.warn("Account tidak berhasil didapatkan!");
      return res.status(201).json({
        state: false,
        message: "Account tidak berhasil didapatkan!",
        payload: null,
      });
    }

    logger.info("Akun berhasil didapatkan!");
    return res.status(200).json({
      state: true,
      message: "Akun berhasil didapatkan!",
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json(err);
  }
};

exports.getAllEvent = async function getAllEvent(req, res) {
  try {
    const result = await pool.query("SELECT * FROM user_info");

    logger.info("Semua akun berhasil didapatkan!");
    return res.status(200).json({
      message: "Semua akun berhasil didapatkan!",
      payload: result.rows,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json(err);
  }
};

exports.editEvent = async function editEvent(req, res) {
  const { namaUserOld, namaUserNew, emailUserNew, passwordUserNew } = req.body;
  const hashedPassword = await bcrypt.hash(passwordUserNew, 10);
  try {
    const initial = await pool.query(
      "SELECT * FROM user_info WHERE nama_user=$1",
      [namaUserOld]
    );

    if (initial.rowCount <= 0) {
      logger.warn("User tidak dapat ditemukan!");
      return res.status(201).json({
        state: false,
        message: "User tidak dapat ditemukan!",
        payload: null,
      });
    }

    const user = initial.rows[0];

    if (namaUserNew == user.nama_user) {
      const result = await pool.query(
        "UPDATE user_info SET email_user=$1,password_user=$2 WHERE nama_user=$3 RETURNING *",
        [emailUserNew, hashedPassword, namaUserOld]
      );

      logger.info("Email dan password user berhasil diubah!");
      return res.status(200).json({
        state: true,
        message: "Nama dan password user berhasil diubah!",
        payload: result.rows[0],
      });
    }

    if (emailUserNew == user.email_user) {
      const result = await pool.query(
        "UPDATE user_info SET nama_user=$1,password_user=$2 WHERE nama_user=$3 RETURNING *",
        [namaUserNew, hashedPassword, namaUserOld]
      );

      logger.info("Info user berhasil diubah!");
      return res.status(200).json({
        state: true,
        message: "Nama, email, dan password user berhasil diubah!",
        payload: result.rows[0],
      });
    }

    const result = await pool.query(
      "UPDATE user_info SET nama_user=$1,email_user=$2,password_user=$3 WHERE nama_user=$4 RETURNING *",
      [namaUserNew, emailUserNew, hashedPassword, namaUserOld]
    );

    logger.info("Info user berhasil diubah!");
    return res.status(200).json({
      state: true,
      message: "Info user berhasil diubah!",
      payload: result.rows[0],
    });
  } catch (err) {
    logger.error(err);
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
      // If no user data is found, respond with a 201 Unauthorized status and an error message.
      res.status(201).json({ error: error });
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
    res.status(200).json({ payload: insert.rows });
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
      // If no user data is found, respond with a 201 Unauthorized status and an error message.
      res.status(201).json({ error: error });
    }

    // Retrieve the inventory information from the first row of the result.
    const user = result.rowCount[0];
    // Respond with a 200 OK status and the user's inventory data.
    res.status(200).json({ payload: user.inventory_user });
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

exports.payEvent = async function payEvent(req, res) {
  const { totalBelanja, namaUser } = req.body;

  try {
    const result = await pool.query(
      "UPDATE user_info SET saldo_user=saldo_user-$1 WHERE nama_user=$2",
      [totalBelanja, namaUser]
    );

    return res.status(200).json({
      state: true,
      message: "User Payment Successfully",
      payload: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
