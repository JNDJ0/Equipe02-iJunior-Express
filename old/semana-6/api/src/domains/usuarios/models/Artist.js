const sequelize = require('../../../../database/index');
const {DataTypes} = require('sequelize');
// const Music = require('../../musicas/models/Music');
const Music = require('./Music');

const Artist = sequelize.define('Artist',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull: false,
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    nacionality :{
        type: DataTypes.STRING,
        allowNull: false,
    },

    photo: {
        type: DataTypes.STRING,
        allowNULL: false,
    },
});

Artist.sync({alter: true, force: false})
    .then(() => {
        console.log('Tabela de Artistas foi (re)criada');
    })
    .catch((error) => console.log(error));

module.exports = Artist;