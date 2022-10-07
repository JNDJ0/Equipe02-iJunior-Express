const express = require('express');
const statusCodes = require('../../../../constants/statusCodes');
const router = express.Router();
const ArtistService = require('../service/ArtistService');


// ********************************** ARTISTAS ******************************************************
router.get('/', async (req, res, next) => {
    try {
        const artist = await ArtistService.getAll();
        return res.status(statusCodes.SUCCESS).send(artist);

    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        await ArtistService.creation(req.body);
        return res.status(statusCodes.SUCCESS).send("Artist created successfully!");
    } catch (error){
        next(error)
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        await ArtistService.updateArtist(req.body, req.params.id);
        return res.status(statusCodes.SUCCESS).send("Artist successfully updated!");

    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => { 
    try {
        await ArtistService.deleteArtist(req.params.id);
        res.status(statusCodes.SUCCESS).send("Artist successfully deleted!");

    } catch (error) {
        next(error);
    }
})

module.exports = router;