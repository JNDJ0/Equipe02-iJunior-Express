const express = require('express');
const router = express.Router();
const Music = require('../models/Music');
const MusicService = require('../service/MusicService');

// ********************************** MUSICA ******************************************************
router.get('/', async (req, res, next) => {
    try {
        const music = await MusicService.getAll();
        res.status(200).send(music);
    } catch (error) {
        res.status(400).send("error");
    }
})

router.post('/', async (req, res, next) => {
    const body = req.body;
    try {
        await MusicService.creation(body);
        return res.status(200).send("musica enviada com sucesso!");
    } catch {
        return res.status(400).send("error");
    }
});


router.put('/:id', async (req, res, next) => {
    try {

        var id = req.params.id;
        const findMusic = await MusicService.findMusic(id);

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

        await MusicService.updateMusic(musicData, id);

        res.status(200).send("Musica atualizada com sucesso!");
    } catch (error) {
        res.status(400).send("error")
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        var id = req.params.id;

        const findMusic = await MusicService.findMusic(id);
        MusicService.deleteMusic(id);

        res.status(200).send(findMusic);
    } catch (error) {
        res.status(400).send("error")
    }
})

module.exports = router;