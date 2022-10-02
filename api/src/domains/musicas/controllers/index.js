const express = require('express');
const router = express.Router();
const MusicService = require('../service/MusicService');

// ********************************** MUSICA ******************************************************
router.get('/', async (req, res, next) => {
    try {
        const music = await MusicService.getAll();
        res.status(200).send(music);
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => { // problema com ArtistaID
    try {
        await MusicService.creation(req.body);
        return res.status(200).send("musica enviada com sucesso!");
    } catch (error){
        next(error)
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        await MusicService.updateMusic(req.body, req.params.id);
        res.status(200).send("Musica atualizada com sucesso!");
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => { //problema com os erros do delete (deletar muscia com um id que n existe)
    try {
        var id = req.params.id;

        const findMusic = await MusicService.findMusic(id);
        MusicService.deleteMusic(id);

        res.status(200).send(findMusic);
    } catch (error) {
       next(error);
    }
})

module.exports = router;