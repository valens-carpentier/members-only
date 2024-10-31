const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'valenscarpentier',
    password: 'a2s8zzqr',
    database: 'members_app_db',
    port: 5432
});

module.exports = pool;
