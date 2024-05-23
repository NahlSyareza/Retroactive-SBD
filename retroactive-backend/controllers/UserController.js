// Importing the Pool class from the 'pg' module for managing connections to PostgreSQL databases.
const { Pool } = require("pg");

// Creating a new instance of Pool with database connection configuration using environment variables.
// SSL is enabled for secure communication.
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  ssl: {
    require: true,
  },
});

// Connecting to the PostgreSQL server and logging a message upon successful connection.
pool.connect().then(() => {
  console.log("Connected to Postgres Server!");
});

// Function to register a new user event.
exports.registerEvent = async function registerEvent(req, res) {
  const { namaUser, emailUser, passwordUser } = req.body;

  try {
    // Executing an INSERT query to register a new user in the database.
    const result = await pool.query(
      "INSERT INTO user_data (nama_user, email_user, password_user, saldo_user) VALUES ($1, $2, $3, 0) RETURNING *",
      [namaUser, emailUser, passwordUser]
    );
    // Sending a JSON response with the result of the query execution.
    res.status(200).json({ data: result });
  } catch (err) {
    // Handling errors and sending a 500 status code with the error message.
    res.status(500).json(err);
  }
};

// Function to handle user login event.
exports.loginEvent = async function loginEvent(req, res) {
  const { emailUser, passwordUser } = req.body;
  let error = "The account that you've entered is not valid.";

  try {
    // Executing a SELECT query to validate user credentials for login.
    const result = await pool.query(
      "SELECT * FROM user_data WHERE email_user = $1 AND password_user = $2 RETURNING *",
      [emailUser, passwordUser]
    );

    if (result.rowCount < 0) {
      // Handling login failure based on the result of the query execution.
      res.status(401).json({ error: error });
    } else {
      res.status(200).json({ data: result });
    }
  } catch (err) {
    // Handling errors and sending a 500 status code with the error message.
    res.status(500).json(err);
  }
};

// Function to handle user profile editing.
exports.editProfile = async function editProfile(req, res) {
  const { newName, newEmail, newPassword } = req.body;
  let error = "The email that you've entered is not valid.";

  try {
    // Executing a SELECT query to retrieve user data for profile editing.
    const result = await pool.query(
      "SELECT * FROM user_data WHERE email_user = $1",
      [emailUser]
    );

    if (result.rowCount < 0) {
      // Handling the case where the user email is not found in the database.
      res.status(401).json({ error: error });
    }

    const user = result.rows[0];

    /*Code for editing profile attributes (name, email, password) based on user input.*/
    // Executing an INSERT query to update the user profile in the database.
    const insert = await pool.query(
      "INSERT INTO user_data (nama_user, email_user, password_user) VALUES ($1, $2, $3) RETURNING *",
      [user.nama_user, user.email_user, user.password_user]
    );
    // Sending a JSON response with the result of the query execution.
    res.status(200).json({ data: insert });
  } catch (err) {
    // Handling errors and sending a 500 status code with the error message.
    res.status(500).json(err);
  }
};

// Function to handle user balance top-up.
exports.topUp = async function topUp(req, res) {
  const { balance, emailUser } = req.body;
  let error = "The email that you've entered is not valid.";
  let noBalance = "Invalid balance because it's negative.";

  try {
    // Executing a SELECT query to retrieve user data for balance top-up.
    const result = await pool.query(
      "SELECT * FROM user_data WHERE email_user = $1",
      [emailUser]
    );

    if (result.rowCount < 0) {
      // Handling the case where the user email is not found in the database.
      res.status(401).json({ error: error });
    }

    const user = result.rows[0];

    if (balance <= 0) {
      // Handling the case where the provided balance is negative.
      res.status(400).json({ error: noBalance });
    }

    /* Code for updating user balance with the provided amount.*/
    // Executing an INSERT query to update the user balance in the database.
    const insert = await pool.query(
      "INSERT INTO user_data (email_user, saldo_user) VALUES ($1, $2) RETURNING *",
      [user.email_user, user.saldo_user]
    );
    // Sending a JSON response with the result of the query execution.
    res.status(200).json({ data: insert });
  } catch (err) {
    // Handling errors and sending a 500 status code with the error message.
    res.status(500).json(err);
  }
};

// Function to handle user inventory functionality.
exports.inventoryFunction = async function inventoryFunction(req, res) {
  const { emailUser } = req.body;
  let error = "The email that you've entered is not valid.";

  try {
    // Executing a SELECT query to retrieve user data including inventory.
    const result = await pool.query(
      "SELECT * FROM user_data WHERE email_user = $1",
      [emailUser]
    );

    if (result.rowCount < 0) {
      // Handling the case where the user email is not found in the database.
      res.status(401).json({ error: error });
    }

    const user = result.rowCount[0];

    /*Code for processing user inventory data.*/
    // Sending a JSON response with the user's inventory data.
    res.status(200).json({ data: user.inventory_user });
  } catch (err) {
    // Handling errors and sending a 500 status code with the error message.
    res.status(500).json(err);
  }
};
