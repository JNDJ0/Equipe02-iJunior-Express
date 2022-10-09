const InvalidParamError = require('../../../../errors/InvalidParamError');
const QueryError = require('../../../../errors/QueryError');
const PermissionError = require('../../../../errors/PermissionError');
const UserMusic = require('../models/UserMusic');

const Music = require('../../musics/models/Music');
const User = require('../../users/models/User');

const UserService = require('../../users/service/UserService');
const MusicService = require('../../musics/service/MusicService')

class UserMusicService  {
    // async create(userId, songId){
    //   const User = await UserService.getById(userId);
    //   const Music = await MusicService.getById(songId);
    //   await Music.addUser(User.id);
    // }
}

module.exports = UserMusicService;