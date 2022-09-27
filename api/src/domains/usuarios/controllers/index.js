const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserService = require('../service/UserService');
const statusCodes = require('../../../../constants/statusCodes');
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
        return res.status(statusCodes.SUCCESS);
    }catch{
        return res.status(statusCodes.NOT_FOUND);
    }
});

router.get('/user', async(req,res) =>{
    try{
        const users = await UserService.getAll()
        console.log(users);
        return res.status(statusCodes.SUCCESS);
    }catch{
        return res.status(statusCodes.NOT_FOUND);
    }
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

    res.status(statusCodes.SUCCESS).send(findUser);
});

router.delete('/user/:id',async(req,res)=>{
    var id = req.params.id;

    const findUser = await User.findOne({raw: true, where:{id: id}})    
    User.destroy({where:{id:id}})

    res.status(statusCodes.SUCCESS).send(findUser);
});

module.exports = router;

