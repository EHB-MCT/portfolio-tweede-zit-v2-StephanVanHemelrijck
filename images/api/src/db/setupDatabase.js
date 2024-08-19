const mysql = require("mysql2/promise"); // Using mysql2 to create the database if it doesn't exist

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`
  );
  await connection.end();
}

async function setupDatabase() {
  try {
    await createDatabaseIfNotExists();

    console.log("Database setup complete");
  } catch (err) {
    console.error("Error setting up database:", err);
    process.exit(1);
  }
}

setupDatabase();
