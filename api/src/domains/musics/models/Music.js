const sequelize = require('../../../../database/index');
const {DataTypes} = require('sequelize');
const Artist = require('../../artists/models/Artist');

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


Music.sync({alter: true, force: true})
    .then(() => {
        // console.log('Tabela de Musicas foi (re)criada');
    })
    .catch((error) => console.log(error));

module.exports = Music;