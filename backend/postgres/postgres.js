const db = require('./config/database');

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established');
    })
    .catch(err => {
        console.error('Unable to connect the database:', err);
    })

