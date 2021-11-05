
exports.up = function(knex) {
    return knex.schema.createTable('category', function (table) {
        table.increments('categoryId',{ primaryKey: true });        
        table.string('name').notNullable();        
        table.timestamp('created_at').defaultTo(knex.fn.now());     
        table.timestamp('updated_at').defaultTo(knex.fn.now());  
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('category');
};
