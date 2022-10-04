const express = require('express');
const router = express.Router();
const UserService = require('../service/UserService'); //obs: no github, a pasta service está com a letra maiuscula por algum motivo :X
const statusCodes = require('../../../../constants/statusCodes');
// const auth-middlewares = require("../../../../middlewares/auth-middlewares");
// ********************************** USUARIOS ******************************************************


router.post('/login', {

});

router.post('/logout', {
    
});

router.get('/', async(req,res,next) =>{
    // verifyJWT,
    try{
        const users = await UserService.getAll()
        return res.status(statusCodes.SUCCESS).send(users);
    }catch(error){
        next(error)
    }
});

router.post('/',async(req,res,next) =>{
    try{
        await UserService.creation(req.body);
        return res.status(statusCodes.SUCCESS).send("User created successfully!");
    }catch(error){
        next(error)
    }
});


router.put ('/:id',async(req,res,next)=>{
    // verifyJWT,
   try{
        await UserService.newUser(req.params.id, req.body);
        return res.status(statusCodes.SUCCESS).send("User successfully updated");
   }catch(error){
        next(error)
   }
});

router.delete('/:id',async(req,res,next)=>{
    // verifyJWT,
    try{
        await UserService.deleteUser(req.params.id);
        res.status(statusCodes.SUCCESS).send("User successfully deleted!");
    } catch(error){
        next(error);
    }
});

module.exports = router;

