const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const ArtistService = require('../service/ArtistService');


// ********************************** ARTISTAS ******************************************************
router.get('/', async (req, res, next) => {
    try {
        const artist = await ArtistService.getAll();
        return res.status(200).send(artist);

    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        await ArtistService.creation(req.body);
        return res.status(201).send("Artista criado com sucesso! ");
    } catch (error){
        next(error)
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        await ArtistService.updateArtist(req.body, req.params.id);
        return res.status(200).send("Artista atualizado com sucesso!");

    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => { // detecção de erros do delete não funcional
    try {
        ArtistService.deleteArtist(req.params.id);
        res.status(200).send("Artista deletado com sucesso");

    } catch (error) {
        next(error);
    }
})

module.exports = router;