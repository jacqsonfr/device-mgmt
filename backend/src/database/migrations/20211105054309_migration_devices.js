
exports.up = function(knex) {
    return knex.schema.createTable('device', function (table) {
        table.increments('deviceId');        
        table.integer('category_id').unsigned().notNullable();
        table.string('color').notNullable();        
        table.integer('part_number').notNullable();        
        table.timestamp('created_at').defaultTo(knex.fn.now());     
        table.timestamp('updated_at').defaultTo(knex.fn.now());  
        
        table.foreign('category_id').references('categoryId').inTable('category');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('device');
};
