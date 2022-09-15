const options = {
    client: "sqlite3",
    connection: {
      filename: "./bd/ecommerce.sqlite"
    },
    useNullAsDefault: true,
  };
module.exports = { options };