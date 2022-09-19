const User = require('../models/User');
const router = require('express').Router();

class UserService{
    async creation(body){
        await User.create(body);
    }
}



module.exports = new UserService();