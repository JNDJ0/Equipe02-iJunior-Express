const sequelize = require('../../../../database/index');
const { DataTypes } = require('sequelize');
const Music = require('../../musics/models/Music');
const User = require('../../users/models/User');


const UserMusic = sequelize.define('UserMusic', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
});

User.belongsToMany(Music, {
    through: 'UserMusic',
});

Music.belongsToMany(User, {
    through: 'UserMusic',
});

Music.hasMany(UserMusic);
UserMusic.belongsTo(Music);
User.hasMany(UserMusic);
UserMusic.belongsTo(User);

UserMusic.sync({ alter: true, force: true })
    .then(() => {
        // console.log('Tabela de UsuarioMusicas foi (re)criada');
    })
    .catch((err) => console.log(err));

module.exports = UserMusic;