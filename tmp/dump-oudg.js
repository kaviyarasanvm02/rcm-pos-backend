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
  const sql = `SELECT * FROM ${process.env.SERVICE_LAYER_COMPANYDB}.OUDG`;
  const rows = conn.exec(sql);
  console.log(JSON.stringify(rows, null, 2));
} catch (err) {
  console.error(err);
} finally {
  conn.disconnect();
}
