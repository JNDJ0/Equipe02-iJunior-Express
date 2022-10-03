const express = require('express');
const { SUCCESS } = require('../../../../constants/statusCodes');
const router = express.Router();
const MusicService = require('../service/MusicService');

// ********************************** MUSICA ******************************************************
router.get('/', async (req, res, next) => {
    try {
        const music = await MusicService.getAll();
        res.status(SUCCESS).send(music);
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => { // problema com ArtistaID
    try {
        await MusicService.creation(req.body);
        return res.status(SUCCESS).send("Music created successfully!");
    } catch (error){
        next(error)
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        await MusicService.updateMusic(req.body, req.params.id);
        res.status(SUCCESS).send("Music successfully updated!");
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => { 
    try {
        const findMusic = await MusicService.findMusic(req.params.id);
        await MusicService.deleteMusic(req.params.id);
        res.status(SUCCESS).send("Music successfully deleted!");
    } catch (error) {
       next(error);
    }
})

module.exports = router;