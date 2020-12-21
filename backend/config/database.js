const Sequelize =  require('sequelize');
const db= new Sequelize('postgres://fozan:pass@postgres:5432/dev_database');
// console.log("db:", db);
module.exports = db;