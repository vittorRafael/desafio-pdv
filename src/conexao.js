const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        //port: process.env.DB_PORT,
        user: 'postgres',
        password: '',
        database: 'pdv',
    }
})

module.exports = knex