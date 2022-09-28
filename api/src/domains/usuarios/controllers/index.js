const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserService = require('../service/UserService'); //obs: no github, a pasta service está com a letra maiuscula por algum motivo :X
const statusCodes = require('../../../../constants/statusCodes');

// ********************************** USUARIOS ******************************************************
router.get('/', async(req,res) =>{
    try{
        const users = await UserService.getAll()
        return res.status(statusCodes.SUCCESS).send(users);
    }catch{
        return res.status(statusCodes.NOT_FOUND);
    }
});

router.post('/',async(req,res) =>{
    try{
        const body = req.body;
        await UserService.creation(body);
        return res.status(statusCodes.SUCCESS).send("Usuario criado com sucesso!");
    }catch(error){
        return res.status(statusCodes.NOT_FOUND).send(error);
    }
});


router.put ('/:id',async(req,res)=>{
   try{
        await UserService.newUser(req.params.id, req.body);
        return res.status(statusCodes.SUCCESS).send("Usuário alterado com sucesso");
   }catch{
        return res.status(statusCodes.NOT_FOUND);
   }
});

router.delete('/:id',async(req,res)=>{
    try{
        await UserService.deleteUser(req.params.id);
        res.status(statusCodes.SUCCESS).send("Usuário deletado com sucesso!");
    } catch(error){
        res.status(statusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
});

module.exports = router;

