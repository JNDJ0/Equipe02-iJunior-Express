const Artist = require('../models/Artist');
const router = require('express').Router();

class ArtistService{
    async creation(body){
        await Artist.create(body);
    }

    async getAll(){
        return await Artist.findAll({raw:true});
    }

    async findArtist(id){
        return await Artist.findByPk(id);
    }

    async updateArtist(artistData, id){
        return await Artist.update(artistData, { where: {id: id}})
    }

    async deleteArtist(id){
        await Artist.destroy({where:{id:id}})
    }
}

module.exports = new ArtistService();