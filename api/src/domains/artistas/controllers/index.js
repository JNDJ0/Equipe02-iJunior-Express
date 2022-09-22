const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const ArtistService = require('../service/ArtistService');


// ********************************** ARTISTAS ******************************************************
router.post('/user',async(req,res) =>{
    const body = req.body;
    try{
        await ArtistService.creation(body);
        return res.status(201);
    }catch{
        return res.status(400);
    }
});

router.get('/artist', async(req,res) =>{
    const artist = await Artist.findAll({raw:true})
    console.log(artist)
    res.status(200).send(artist);
})


router.put ('/artist/:id',async(req,res)=>{
    var id = req.params.id;
    const findArtist = await Artist.findOne({raw: true, where:{id: id}})

    const name = req.body.nome
    const nacionality = req.body.nacionality
    const phone = req.body.phone

    const artistData = {
        name,
        nacionality,
        phone,
    }

    await Artist.update(artistData, { where: {id: id}})

    res.status(200).send(findArtist);
});

router.delete('/artist/:id',async(req,res)=>{
    var id = req.params.id;

    const findArtist = await Artist.findOne({raw: true, where:{id: id}})    
    Artist.destroy({where:{id:id}})

    res.status(200).send(findArtist);
})

module.exports =  router;