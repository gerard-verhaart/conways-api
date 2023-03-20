exports.up = (knex) => {
  return knex.schema.createTable('Comments', (table) => {
    table.increments().primary()
    table.integer('post_id').references('Posts.id')
    table.date('date_posted')
    table.string('comment')
    // table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('Comments')
}
