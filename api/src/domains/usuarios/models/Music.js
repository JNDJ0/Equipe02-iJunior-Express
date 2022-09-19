const sequelize = require('../../../../database/index');
const {DataTypes} = require('sequelize');
const Artist = require('../../usuarios/models/Artist');
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

    artistID :{
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    
    category: {
        type: DataTypes.INTEGER,
        allowNULL: false,
    },
});
Music.belongsTo(Artist,{
    constraint: true,
    foreignKey: 'artistID'
});

Artist.hasMany(Music,{
    foreingKey: 'artistID'
})

Music.sync({alter: true, force: false})
    .then(() => {
        console.log('Tabela de Musicas foi (re)criada');
    })
    .catch((error) => console.log(error));

module.exports = Music;