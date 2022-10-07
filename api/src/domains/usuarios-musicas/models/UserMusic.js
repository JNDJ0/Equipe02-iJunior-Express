const sequelize = require('../../../../database/index');
const {DataTypes, Sequelize} = require('sequelize');
const Music = require('../../musicas/models/Music');
const User = require('../../usuarios/models/User');


const UserMusic = sequelize.define('UserMusic',{});

UserMusic.associate = (Music) =>
{
    User.belongsToMany(Music,{
        through: 'UserMusic',
        as: 'music',
        foreignKey: 'user_id',
        otherkey:'music_id'
    });

    Music.belongsToMany(User,{
        through:'UserMusic',
        as: 'user',
        foreignKey: 'music_id',
        otherkey:'user_id'
    });
};
// User.hasMany(Music);
// Music.hasMany(User);

UserMusic.sync({alter: false, force: false})
    .then(()=>{
        console.log('Tabela de UsuarioMusicas foi (re)criada');
    })
    .catch((err)=>console.log(err));
    
module.exports = UserMusic;