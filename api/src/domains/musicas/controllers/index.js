const {  application  } = require('express');
const express = require('express');
const app = require('../../../../config/expressConfig');
const router = express.Router();

const music = require('../models/musics');

// router.get('/songs', function(req,res){
//     res.status(200).send(music);
// });

router.get('/songs/', function(req,res){
    res.json(music);
});

router.get('/songs/:name', function(req,res){
    const {name} = req.params;
    const song = music.find(song => song.nome == name);

    if(!song) return res.status(204).json();

    res.json(song);
});

router.post('/',function(req,res){
    const {nome, artista, genero, quantidadeDownloads} = req.body;
    
    res.status(200).json({nome, artista, genero, quantidadeDownloads});
});

module.exports = router;