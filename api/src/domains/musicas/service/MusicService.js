const Music = require('../models/Music');
const router = require('express').Router();

class MusicService{
    async creation(body){
        await Music.create(body);
    }

    async getAll(){
        return await Music.findAll({raw:true});
    }

    async findMusic(id){
        return await Music.findByPk(id);
    }

    async updateMusic(musicData, id){
        await Music.update(musicData, { where: {id: id}})
    }

    async deleteMusic(id){
        await Music.destroy({where:{id:id}})
    }
}

module.exports = new MusicService();