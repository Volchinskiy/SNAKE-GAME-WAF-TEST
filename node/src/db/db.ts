import Pg from "pg";

const pool = new Pg.Pool({
  host: "localhost",
  database: "waf_test",
  user: "postgres",
  port: 5432,
  password: "qwerty",
});

export default pool;
