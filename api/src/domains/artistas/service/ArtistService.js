const Artist = require('../models/Artist');
const router = require('express').Router();

class ArtistService{
    async creation(body){
        await Artist.create(body);
    }
}

module.exports = new ArtistService();