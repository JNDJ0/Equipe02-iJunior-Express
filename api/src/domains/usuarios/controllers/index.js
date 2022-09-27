const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserService = require('../service/UserService'); //obs: no github, a pasta service está com a letra maiuscula por algum motivo :X
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
   try{
        const newUser = await UserService.newUser(req.params.id, req.body);
        return res.status(statusCodes.SUCCESS);
   }catch{
        return res.status(statusCodes.NOT_FOUND);
   }
});

router.delete('/user/:id',async(req,res)=>{
    try{
        const user = await UserService.deleteUser(req.params.id);
    
        res.status(statusCodes.SUCCESS);send(user);
    } catch{
        res.status(statusCodes.INTERNAL_SERVER_ERROR);
    }
});

module.exports = router;

