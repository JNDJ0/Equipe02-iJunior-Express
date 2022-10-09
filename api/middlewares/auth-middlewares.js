const statusCodes = require('../constants/statusCodes');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const User = require('../src/domains/users/models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require("../src/domains/users/service/UserService");
const PermissionError = require('../errors/PermissionError');
require('dotenv').config();


const blacklist = [];

function generateJWT(user, res) {
    const body = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign({ user: body }, process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRATION });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
    });
}

function cookieExtractor(req) {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
}

function verifyJWT(req, res, next) {
    try {
        const token = cookieExtractor(req);

        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded.user
            req.token = token
        }

        if (!req.user) {
            throw new NotAuthorizedError("You need to login first!");
        }
        next();
    } catch (error) {
        next(error);
    }
}

async function loginMiddleware(req, res, next) {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });//User.findOne({where: {email: req.body.email}});
        if (!user) {
            throw new NotAuthorizedError('Incorrect e-mail or password!');
        } else {
            const matchingPassword = await bcrypt.compare(req.body.password, user.password);
            if (!matchingPassword) {
                throw new NotAuthorizedError('Incorrect e-mail or password!');
            }
            // else{
            //     await UserService.userLogin(req.params.id, true);
            // }
            generateJWT(user, res);
        }

        generateJWT(user, res);

        res.status(statusCodes.SUCCESS).send("Logged");
    } catch (error) {
        next(error);
    }
}

const checkRole = (roles) => {
    return (req, res, next) => {
      try {
        ! roles.includes(req.user.role) ? res.json('You do not have permission to perform this action') : next();
      } catch(error){
        next(error);
      }
  
    };
  };

async function notLoggedIn(req, res, next) {
    try {
        const token = cookieExtractor(req);

        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded) {
                throw new PermissionError("You are already logged!");
            }
        }
        next();
    }
    catch (error) {
        next(error)
    }
}


module.exports = { loginMiddleware, notLoggedIn, verifyJWT, checkRole };