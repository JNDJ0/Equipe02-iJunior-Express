const Artist = require('../models/Artist');
const router = require('express').Router();
const QueryError = require('../../../../errors/QueryError');

class ArtistService{
    async creation(body){
        await Artist.create(body);
    }

    async getAll(){
        const allArtist = await Artist.findAll({raw:true});
        if(!allArtist){
            throw new QueryError("Nenhum artista foi encontrado");
        }
        return allArtist;
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