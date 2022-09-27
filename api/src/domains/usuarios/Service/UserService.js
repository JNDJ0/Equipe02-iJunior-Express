const { QueryError } = require('sequelize');
const User = require('../models/User');
const router = require('express').Router();

class UserService{
    async creation(body){
        await User.create(body);
    }
    async getAll(){
        const users = await User.findAll();

        if (!users){
            throw new QueryError('There are no users in the system.');
        }

        return users;
    }
}



module.exports = new UserService();