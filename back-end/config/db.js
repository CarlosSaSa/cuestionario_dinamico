const { createConnection } = require('mysql');

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '*****',
    database: 'cuestionarios'
});

exports.connection = connection;