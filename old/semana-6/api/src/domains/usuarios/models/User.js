const sequelize = require('../../../../database/index');
const {DataTypes} = require('sequelize');

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

User.sync({alter: true, force: false})
    .then(() => {
        console.log('Tabela de Usuarios foi (re)criada');
    })
    .catch((error) => console.log(error));

module.exports = User;