const Pool = require("pg").Pool;

const pool = new Pool({
  host: ["localhost", "db"],
  // host: "db",
  database: "postgres",
  user: "postgres",
  password: "admin",
  port: 5432,
});

module.exports = pool;
