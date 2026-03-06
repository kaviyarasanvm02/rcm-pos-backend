const typeorm = require("typeorm");

// Explicitly import all entities (glob paths don't work in esbuild bundles)
const StoreCounters = require("../entities/store-counters");
const Stores = require("../entities/stores");
const CashDenominations = require("../entities/cash-denominations");
const ParkedTransactions = require("../entities/parked-transactions");
const QcItemGroup = require("../entities/qc-item-group");
const QcItemGroupMembers = require("../entities/qc-item-group-members");
const StoreUsers = require("../entities/store-users");
const StoreWarehouses = require("../entities/store-warehouses");
const UserGroups = require("../entities/user-groups");
const UserSessionLog = require("../entities/user-session-log");

const dataSource = new typeorm.DataSource({
  type: process.env.TYPEORM_TYPE,
  host: process.env.HANA_HOST,
  port: process.env.HANA_PORT,
  username: process.env.HANA_USER,
  password: process.env.HANA_PASSWORD,
  schema: process.env.SERVICE_LAYER_COMPANYDB,
  synchronize: true,  //setting it `true` will update the Table structure in the db when app restarts
  logging: ["query"], //"error",
  entities: [StoreCounters, Stores, CashDenominations, ParkedTransactions, QcItemGroup, QcItemGroupMembers, StoreUsers, StoreWarehouses, UserGroups, UserSessionLog]
});

console.log("Before typeORM initializes...");
dataSource.initialize()
  .then(() => {
    console.info("Database has been initialized by TypeORM!");
  })
  .catch((error) => {
    console.error("Failed to initialize db using TypeORM!");
    console.log(error)
  });

module.exports = { dataSource }