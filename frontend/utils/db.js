import mysql from "mysql2/promise";

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Export a function to execute queries
export default async function executeQuery({ query, values }) {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(query, values);
    connection.release();
    return results;
  } catch (error) {
    return { error };
  }
}
