
const knex = require("knex")({
    client: "sqlite3",
    connection: {filename: "./bd/ecommerce.sqlite",
    },
    useNullAsDefault: true,
});  
  
knex.schema.createTable("products", (table) => {
    table.increments('id').primary().notNullable(),
    table.timestamp('timestamp').notNullable(),
    table.string('title', 100).notNullable(),
    table.float('price').notNullable(),
    table.string('description', 300),
    table.string('code').unique(),
    table.string('image', 200),
    table.integer('stock').notNullable()
    })
    .then(() => {
        console.log("todo bien");
        knex.destroy();
    })
    .catch((err) => {
        console.log(err);
        throw new Error(err);
    })
    .finally(() => {
        knex.destroy();
    });