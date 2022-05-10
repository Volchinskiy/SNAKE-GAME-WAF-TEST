import Pg from "pg";

const pool = new Pg.Pool({
  host: "ec2-176-34-211-0.eu-west-1.compute.amazonaws.com",
  database: "di2e9p35ftokq",
  user: "xffuzqwfeveywu",
  port: 5432,
  password: "05a3a384e1dd48bffaca500a667329a01baf28b732be4d7aa8dfe8bcba9dd847",
});

export default pool;
