exports.up = knex => {
  return knex.schema.createTable("posts", table => {
      table.increments("id");
      table.string("username");
      table.text("image_url");
      table.string("content");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
};
// The exports.down method is used when a migration is rolled
// back (reverted.) You should always a query that reverses
// the query in "up".
exports.down = knex => {
  return knex.schema.dropTable("posts");
};
