const { config } = require("dotenv");
config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
  // test: {
  //   username: "postgres",
  //   password: "coditas@8090",
  //   database: "Project Management Trello",
  //   host: "127.0.0.1",
  //   dialect: "postgres"
  // },
  // production: {
  //   username: "postgres",
  //   password: "coditas@8090",
  //   database: "Project Management Trello",
  //   host: "127.0.0.1",
  //   dialect: "postgres"
  // }
};
