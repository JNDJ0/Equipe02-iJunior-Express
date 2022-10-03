const Artist = require('../models/Artist');
const router = require('express').Router();
const QueryError = require('../../../../errors/QueryError');
const InvalidParamError = require('../../../../errors/InvalidParamError');

class ArtistService{
    async creation(body){

        if (body.name === "" || body.nacionality === "" || body.photo === "" ){
            throw new QueryError("Incomplete artist characteristics");
        }
        await Artist.create(body);
    }

    async getAll(){
        const allArtist = await Artist.findAll({raw:true});
        if(allArtist.length === 0){
            throw new QueryError("No artist found");
        }
        return allArtist;
    }

    
    async updateArtist(artistData, id){
        const artistID = await Artist.findByPk(id);
        if (artistID === null){
            throw new InvalidParamError("No artists were found with this ID");
        }
        if (artistData.name === "" || artistData.nacionality === "" || artistData.photo === "" ){
            throw new QueryError("Incomplete artist characteristics");
        }
        return await Artist.update(artistData, { where: {id: id}});
    }

    async deleteArtist(id){ 
        const artistID = await Artist.findByPk(id);
        if (artistID === null){
            throw new InvalidParamError("No artists were found with this ID");
        }
        return await artistID.destroy();
    }
}

module.exports = new ArtistService();