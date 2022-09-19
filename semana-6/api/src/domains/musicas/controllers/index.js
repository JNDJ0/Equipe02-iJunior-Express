const {  application  } = require('express');
const express = require('express');
const app = require('../../../../config/expressConfig');
const songList = require('../models/musics');
const router = express.Router();

const music = require('../models/musics');

// router.get('/songs', function(req,res){
//     res.status(200).send(music);
// });

router.get('/songs', function(req,res){
    res.json(music);
});

router.get('/songs/:name', function(req,res){
    const {name} = req.params;
    const song = music.find(song => song.nome == name);

    if(!song) return res.status(204).json();

    res.json(song);
});

router.post('/',function(req,res){
    const {nome,artista,genero,quantidadeDownloads} = req.body;

    res.status(200).json({nome, artista, genero, quantidadeDownloads});

    //dar append no json com as informaçoes recebidas
    songList.append({nome: nome, artista: artista, genero: genero, quantidadeDownloads: quantidadeDownloads});
});

router.put('/songs/:name', function(req,res){
    const {name} = req.params;
    const song = music.find(song => song.nome == name);

    if(!song) return res.status(204).json();

    const {nome,artista,genero,quantidadeDownloads} = req.body;

    song.nome = nome;
    song.artista = artista;
    song.genero = genero;
    song.quantidadeDownloads = quantidadeDownloads;

    music.push(song);
    res.json(song);

});

router.delete('/songs/:name', function(req,res){
    const {name} = req.params
    const songsFiltred = music.filter(song => song.nome != name);

    res.json(songsFiltred);
})


module.exports = router;