const InvalidParamError = require('../../../../errors/InvalidParamError');
const QueryError = require('../../../../errors/QueryError');
const Music = require('../models/Music');


class MusicService{
    async creation(body){
        if (body.title === "" || body.category === "" || body.photo === "" || body.artistID ==="" ){
            throw new QueryError("Carcteristicas de música incompletas");
        }
        await Music.create(body);
    }

    async getAll(){
        const allMusic = await Music.findAll({raw:true});
        if (allMusic.length === 0){
            throw new QueryError("Nenhuma música foi encontrada");
        }
        return allMusic;
    }

    async findMusic(id){
        return await Music.findByPk(id);
    }

    async updateMusic(body, id){
        const musicID = await this.findMusic(id);
        if (musicID === null){
            throw new InvalidParamError("Nenhuma música foi encontrada com esse ID");
        }
        if (body.title === "" || body.category === "" || body.photo === "" || body.artistID ==="" ){
            throw new QueryError("Carcteristicas de música incompletas");
        }
        return await Music.update(body, { where: {id: id}})
    }

    async deleteMusic(id){//problema com os erros do delete (deletar muscia com um id que n existe)
        const musicID = await this.findMusic(id);
        if (musicID === null){
            throw new InvalidParamError("Nenhuma música foi encontrado com esse ID");
        }
        return await Music.destroy({where:{id:id}})
    }
}

module.exports = new MusicService();