const {  application  } = require('express');
const express = require('express');
const app = require('../../../../config/expressConfig');
const router = express.Router();

const music = require('../models/musics.js');

router.get("/", function(req,res){
    res.status(200).send(music);
})

module.exports = router;