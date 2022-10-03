const Artist = require('../models/Artist');
const router = require('express').Router();
const QueryError = require('../../../../errors/QueryError');
const InvalidParamError = require('../../../../errors/InvalidParamError');

class ArtistService{
    async creation(body){

        if (body.name === "" || body.nacionality === "" || body.photo === "" ){
            throw new QueryError("Carcteristicas de artista incompletas");
        }
        await Artist.create(body);
    }

    async getAll(){
        const allArtist = await Artist.findAll({raw:true});
        if(allArtist.length === 0){
            throw new QueryError("Nenhum artista foi encontrado");
        }
        return allArtist;
    }

    
    async updateArtist(artistData, id){
        const artistID = await Artist.findByPk(id);
        if (artistID === null){
            throw new InvalidParamError("Nenhum artista foi encontrado com esse ID");
        }
        if (artistData.name === "" || artistData.nacionality === "" || artistData.photo === "" ){
            throw new QueryError("Carcteristicas de artista incompletas");
        }
        return await Artist.update(artistData, { where: {id: id}});
    }

    async deleteArtist(id){ 
        const artistID = await Artist.findByPk(id);
        if (artistID === null){
            throw new InvalidParamError("Nenhum artista foi encontrado com esse ID");
        }
        return await artistID.destroy();
    }
}

module.exports = new ArtistService();