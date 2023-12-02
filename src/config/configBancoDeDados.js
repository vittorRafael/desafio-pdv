const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'db.xygxxxcgxavmuqqsqanr.supabase.co',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'Sa#30163231',
        database: process.env.DB_DATABASE || 'pdv',
        port: process.env.DB_PORT || 5432
    }
});

module.exports = knex