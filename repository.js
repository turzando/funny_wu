require('dotenv/config');
const { Client } = require('pg')

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

client.connect()
    .then(() => {
        console.log('Conexão bem sucedida ao banco de dados!')
    })
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

process.on('SIGINT', () => {
    client.end();
    process.exit();
});

module.exports = {
    client
}