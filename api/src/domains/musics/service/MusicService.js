const InvalidParamError = require('../../../../errors/InvalidParamError');
const QueryError = require('../../../../errors/QueryError');
const Music = require('../models/Music');


class MusicService{
    async creation(body){
        if (body.title === "" || body.category === "" || body.photo === "" || body.artistID ==="" ){
            throw new QueryError("Incomplete music characteristics");
        }
        await Music.create(body);
    }

    async getAll(){
        const allMusic = await Music.findAll({raw:true});
        if (allMusic.length === 0){
            throw new QueryError("No music found");
        }
        return allMusic;
    }

    async findMusic(id){
        return await Music.findByPk(id);
    }

    async updateMusic(body, id){
        const musicID = await this.findMusic(id);
        if (musicID === null){
            throw new InvalidParamError("No musics were found with this ID");
        }
        if (body.title === "" || body.category === "" || body.photo === "" || body.artistID ==="" ){
            throw new QueryError("Incomplete artist characteristics");
        }
        return await Music.update(body, { where: {id: id}})
    }

    async deleteMusic(id){
        const musicID = await this.findMusic(id);
        if (musicID === null){
            throw new InvalidParamError("No musics were found with this ID");
        }
        return await musicID.destroy();
    }
}

module.exports = new MusicService();