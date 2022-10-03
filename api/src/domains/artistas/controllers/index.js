const express = require('express');
const { SUCCESS } = require('../../../../constants/statusCodes');
const router = express.Router();
const ArtistService = require('../service/ArtistService');


// ********************************** ARTISTAS ******************************************************
router.get('/', async (req, res, next) => {
    try {
        const artist = await ArtistService.getAll();
        return res.status(SUCCESS).send(artist);

    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        await ArtistService.creation(req.body);
        return res.status(sucess).send("Artista criado com sucesso! ");
    } catch (error){
        next(error)
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        await ArtistService.updateArtist(req.body, req.params.id);
        return res.status(SUCCESS).send("Artista atualizado com sucesso!");

    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => { 
    try {
        await ArtistService.deleteArtist(req.params.id);
        res.status(SUCCESS).send("Artista deletado com sucesso");

    } catch (error) {
        next(error);
    }
})

module.exports = router;