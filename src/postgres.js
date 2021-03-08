const {Pool} = require('pg');

const pool = new Pool({
    "user": "postgres",
    "password": "televisao",
    "database": "postgres",
    "host": "localhost",
    "port": 5432
});

exports.pool = pool;