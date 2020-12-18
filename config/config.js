const config = { 
    database: 'capstone_db',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        // acquire: 30000,
        idle: 10000,
    },
    privateKey: "$$$capstone$$$",  
};

module.exports = config;
