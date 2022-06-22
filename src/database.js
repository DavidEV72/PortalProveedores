const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('la conexion con la base de datos fue cerrada.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('la base de datos tiene conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('la conexion a la base de datos fue rechazada');
        }
    }

    if (connection) connection.release();
    console.log('Base de datos conectada');

    return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;