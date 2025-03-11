const { connect } = require("chain-db-ts");

// Actual Migrations
const migrations = [
  require("./create_new_rooms_table_110325207")
];

// Env to get the DB credentials
const dotenv = require("dotenv");
dotenv.config();

const dbServer = process.env.DB_HOST as string;
const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASS as string;

const main = async () => {
  const db = await connect({
    server: dbServer,
    database: dbName,
    user: dbUser,
    password: dbPass,
  });

  // Execute all migrations
  await Promise.all(migrations.map((migration) => migration.execute(db)));
};

main();
