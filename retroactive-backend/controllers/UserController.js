const { Pool } = require("pg");

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

  try {
    const query1 = await pool.query(
      "INSERT INTO user_data (nama_user, email_user, password_user) VALUES ($1, $2, $3) RETURNING *",
      [namaUser, emailUser, passwordUser]
    );

    res.status(200).json({ data: query1 });
  } catch (err) {
    res.status(500).json(err);
  }
};
