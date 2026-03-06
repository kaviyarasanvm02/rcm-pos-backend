const hana = require("@sap/hana-client");
const dotenv = require("dotenv");
dotenv.config();

const dbConfig = {
  host : process.env.HANA_HOST,
  port : process.env.HANA_PORT,
  user : process.env.HANA_USER,
  password : process.env.HANA_PASSWORD
};

const conn = hana.createConnection();
try {
  conn.connect(dbConfig);
  const sql = `SELECT COLUMN_NAME FROM TABLE_COLUMNS WHERE TABLE_NAME = 'OUSR' AND SCHEMA_NAME = '${process.env.SERVICE_LAYER_COMPANYDB}'`;
  const rows = conn.exec(sql);
  console.log(JSON.stringify(rows, null, 2));
} catch (err) {
  console.error(err);
} finally {
  conn.disconnect();
}
