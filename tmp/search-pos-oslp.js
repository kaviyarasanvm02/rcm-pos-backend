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
  const sql = `SELECT * FROM ${process.env.SERVICE_LAYER_COMPANYDB}.OSLP`;
  const rows = conn.exec(sql);
  const found = rows.filter(row => {
    return Object.values(row).some(val => String(val).toUpperCase().includes('POS'));
  });
  console.log(JSON.stringify(found, null, 2));
} catch (err) {
  console.error(err);
} finally {
  conn.disconnect();
}
