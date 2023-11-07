/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists("users",function (tablebuilder){
    tablebuilder.string("name"),
    tablebuilder.string("gender"),
    tablebuilder.integer("age"),
    tablebuilder.jsonb("address")
    tablebuilder.jsonb("additional_info"),
    tablebuilder.increments("id")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users")
};
