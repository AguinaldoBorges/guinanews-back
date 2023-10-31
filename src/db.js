// Importar o módulo node-postgres
const { Pool } = require('pg')

// Criar um objeto Pool com as credenciais de acesso ao banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'guinanews',
    password: 'admin',
    port: 5432,
})

module.exports = { pool };
