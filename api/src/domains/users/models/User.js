const sequelize = require('../../../../database/index');
const { DataTypes } = require('sequelize');
const userRoles = require('../../../../constants/UserRoles');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNULL: false,
    },

    role: {
        type: DataTypes.ENUM,
        values: [userRoles.ADMIN, userRoles.USER],
        defaultValue: userRoles.USER,
        allowNull: false
    },
});

User.sync({alter: true, force: true})
    .then(() => {
        // console.log('Tabela de Usuarios foi (re)criada');
    })
    .catch((error) => console.log(error));

module.exports = User;