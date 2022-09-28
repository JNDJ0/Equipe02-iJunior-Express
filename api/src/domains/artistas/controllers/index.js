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
        const body = req.body;
        await ArtistService.creation(body);
        return res.status(201).send("Artista criado com sucesso! ");
    } catch {
        return res.status(400);
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        var id = req.params.id;
        const findArtist = await ArtistService.findArtist(id);

        const name = req.body.name;
        const nacionality = req.body.nacionality;
        const phone = req.body.phone;

        const artistData = {
            name,
            nacionality,
            phone,
        }

        await ArtistService.updateArtist(artistData, id);

        return res.status(200).send(findArtist);

    } catch (error) {
        return res.status(400).send("error");
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        var id = req.params.id;

        const findArtist = await ArtistService.findArtist(id);
        ArtistService.deleteArtist(id);

        res.status(200).send(findArtist);

    } catch (error) {
        return res.status(400).send("error");
    }
})

module.exports = router;