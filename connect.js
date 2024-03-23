const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('jfc', 'postgres', '1234', {
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: false,
//     port: 5432
// });

// const sequelize = new Sequelize('jfc', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false,
//     port: 3306
// });

const sequelize = new Sequelize('knrfsodpj8t17che', 'upbjid8joh6x4rzk', 'mlskdpf7l39k4i0z', {
    host: 'edo4plet5mhv93s3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    logging: false,
    port: 3306
});


module.exports = sequelize;
