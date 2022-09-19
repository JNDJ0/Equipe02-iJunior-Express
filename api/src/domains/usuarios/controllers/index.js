const router = require('express').Router();
const user = require('../models/User');
const userService = require('../Service/UserService');
const artist = require('../models/Artist');
const Music = require('../../musicas/models/Music');

router.post('/', async(req,res) => {
    const body = req.body;
    try{
        await userService.creation(body)
        return res.status(201);
    }catch{
        return res.status(400)
    }
});

// router.post('/', async(req,res) =>{
// })


module.exports = router;

