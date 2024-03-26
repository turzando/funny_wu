const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'db',
    database: 'mydb',
    password: 'postgres',
    port: '5432'
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