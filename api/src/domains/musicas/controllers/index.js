const express = require('express');
const router = express.Router();
const Music = require('../models/Music');
const MusicService = require('../service/MusicService');

// ********************************** MUSICA ******************************************************
router.post('/user',async(req,res) =>{
    const body = req.body;
    try{
        await MusicService.creation(body);
        return res.status(201);
    }catch{
        return res.status(400);
    }
});

router.get('/music', async(req,res) =>{
    const music = await Music.findAll({raw:true})
    console.log(music);
    res.status(200).send(music);
})



router.put ('/music/:id',async(req,res)=>{
    var id = req.params.id;
    const findMusic = await Music.findOne({raw: true, where:{id: id}})

    const title = req.body.title;
    const artistID = req.body.artistID;
    const photo = req.body.photo;
    const category = req.body.category;

    const musicData = {
        title,
        artistID,
        photo,
        category,
    }

    await Music.update(musicData, { where: {id: id}})

    res.status(200).send(findMusic);
});

router.delete('/music/:id',async(req,res)=>{
    var id = req.params.id;

    const findMusic = await Music.findOne({raw: true, where:{id: id}})    
    Music.destroy({where:{id:id}})

    res.status(200).send(findMusic);
})

// router.get('/', (req,res) =>{
//     res.status(200).send(Musica);
// })

// router.post('/',(req,res) =>{
//     console.log(req.body);
//     Musica.push(req.body);

//     res.status(200).send(req.body);
// });

// router.put('/:nome',(req,res)=>{
//     var nome = req.params.nome;
//     //const findMusic = Musica.find(Musica=>Musica.nome === nome);
//     const findMusic = Musica.findIndex(Musica=>Musica.nome === nome);

//     console.log(findMusic);
//     Musica[findMusic].nome = req.body.nome;
//     Musica[findMusic].artista = req.body.artista;
//     Musica[findMusic].genero = req.body.genero;
//     Musica[findMusic].quantidadeDownloads = req.body.quantidadeDownloads;

//     res.status(200).send(Musica[findMusic]);
// });

// router.delete('/:nome',(req,res)=>{
//     var nomeDel = req.params.nome;

//     const findMusicDel = Musica.findIndex(Musica => Musica.nome === nomeDel);
    
//     Musica.splice(findMusicDel,1);

//     res.status(200).send(Musica);
// })


module.exports = router;