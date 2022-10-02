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

    async findArtist(id){
        return await Artist.findByPk(id);
    }

    async updateArtist(artistData, id){
        const artistID = await this.findArtist(id);
        if (artistID === null){
            throw new InvalidParamError("Nenhum artista foi encontrado com esse ID");
        }
        if (artistData.name === "" || artistData.nacionality === "" || artistData.photo === "" ){
            throw new QueryError("Carcteristicas de artista incompletas");
        }
        return await Artist.update(artistData, { where: {id: id}});
    }

    async deleteArtist(id){ // detecção de erros do delete não funcional
        const artistID = await this.findArtist(id);
        if (artistID === null){
            throw new InvalidParamError("Nenhum artista foi encontrado com esse ID");
        }
        await Artist.destroy({where:{id:id}})
    }
}

module.exports = new ArtistService();