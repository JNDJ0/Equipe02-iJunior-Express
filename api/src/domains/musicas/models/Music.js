const sequelize = require('../../../../database/index');
const {DataTypes} = require('sequelize');
const Artist = require('../../artistas/models/Artist');
const User = require('../../usuarios/models/User');
const UserMusic = require('../../usuarios-musicas/models/UserMusic');


const Music = sequelize.define('Music',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull: false,
    },

    photo: {
        type: DataTypes.STRING,
        allowNULL: false,
    },

    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    category: {
        type: DataTypes.INTEGER,
        allowNULL: false,
    },
});

Music.belongsTo(Artist);
Artist.hasMany(Music);



Music.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de Musicas foi (re)criada');
    })
    .catch((error) => console.log(error));

module.exports = Music;