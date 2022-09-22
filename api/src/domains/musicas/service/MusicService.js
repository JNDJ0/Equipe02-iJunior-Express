const Music = require('../models/Music');
const router = require('express').Router();

class MusicService{
    async creation(body){
        await Music.create(body);
    }
}

module.exports = new MusicService();