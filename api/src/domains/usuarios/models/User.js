const sequelize = require('../../../../database/index');
const {DataTypes} = require('sequelize');
const Music = require('../../musicas/models/Music');
const UserMusic = require('./UserMusic');

const User = sequelize.define('User',{
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
  
    email :{
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNULL: false,
    },

    role: {
        type: DataTypes.STRING,
        validate: {content: 'admin', content: 'user'}
    },
});

User.belongsToMany(Music,{
    through: {
        model: UserMusic
    },
    foreignKey: 'idUser',
    constrait: true
})

Music.belongsToMany(User,{
    through: {
        model: UserMusic
    },
    foreignKey: 'idMusic',
    constrait: true
});

User.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de Usuarios foi (re)criada');
    })
    .catch((error) => console.log(error));

module.exports = User;