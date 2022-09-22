const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserService = require('../service/UserService');

/*router.post('/', async(req,res) => {
    const body = req.body;
    try{
        await userService.creation(body)
        return res.status(201);
    }catch{
        return res.status(400)
    }
});
*/
// ********************************** USUARIOS ******************************************************
router.post('/user',async(req,res) =>{
    const body = req.body;
    try{
        await UserService.creation(body)
        return res.status(201);
    }catch{
        return res.status(400);
    }
});

router.get('/user', async(req,res) =>{
    const users = await User.findAll({raw:true})
    console.log(users)
    res.status(200).send(users);
});

router.put ('/user/:id',async(req,res)=>{
    var id = req.params.id;
    const findUser = await User.findOne({raw: true, where:{id: id}})

    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password
    const role = req.body.role

    const userData = {
        name,
        email,
        password,
        role,
    }

    await User.update(userData, { where: {id: id}})

    res.status(200).send(findUser);
});

router.delete('/user/:id',async(req,res)=>{
    var id = req.params.id;

    const findUser = await User.findOne({raw: true, where:{id: id}})    
    User.destroy({where:{id:id}})

    res.status(200).send(findUser);
});

module.exports = router;

