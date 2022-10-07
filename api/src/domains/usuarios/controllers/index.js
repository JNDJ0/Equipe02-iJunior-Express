const express = require('express');
const router = express.Router();
const UserService = require('../service/UserService'); //obs: no github, a pasta service está com a letra maiuscula por algum motivo :X
const statusCodes = require('../../../../constants/statusCodes');
const {loginMiddleware,
    verifyJWT, logoutMiddleware} = require('../../../../middlewares/auth-middlewares');
// const authentication = require("../../../../middlewares/auth-middlewares");
// ********************************** USUARIOS ******************************************************


// router.post('/login',notLoggedIn, loginMiddleware, async(req,res,next)=>{
//     // try{
//     //     await UserService.login(req, res, next);
//     //     res.status(statusCodes.SUCCESS).send("User successfully logged in!");
//     // }
//     // catch (error){
//     //     next(error);
//     // }
// });

// router.post('/logout/:id',async(req,res,next)=>{
//     // verifyJWT
//     try{
//         await UserService.logout(req, res, next); 
//         res.status(statusCodes.SUCCESS).send("User successfully logged out!");
//     } catch(error){
//         next(error);
//     }
// });
router.post('/login',loginMiddleware);

// router.post('/logout',verifyJWT, async(req,res,next) =>{
//     try{

//     }catch(error){
//         next(error);
//     }
// });

router.get('/',verifyJWT, async(req,res,next) =>{
    // 
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


router.put ('/:id',verifyJWT, async(req,res,next)=>{
    // 
   try{
        await UserService.newUser(req.params.id, req.body);
        return res.status(statusCodes.SUCCESS).send("User successfully updated");
   }catch(error){
        next(error)
   }
});

router.delete('/:id',verifyJWT, async(req,res,next)=>{
    // verifyJWT,
    try{
        await UserService.deleteUser(req.params.id);
        res.status(statusCodes.SUCCESS).send("User successfully deleted!");
    } catch(error){
        next(error);
    }
});

module.exports = router;

