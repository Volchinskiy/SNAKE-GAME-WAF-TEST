import Pg from "pg";

const pool = new Pg.Pool({
  user: "postgres",
  password: "qwerty",
  host: "localhost",
  port: 5432,
  database: "waf_test"
});

export default pool;