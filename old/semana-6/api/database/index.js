const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  })
 
module.exports = sequelize;

/* 
Artistas
ID: INTEGER, PK
	    Nome: STRING
	    Nacionalidade: STRING
			Foto: STRING */