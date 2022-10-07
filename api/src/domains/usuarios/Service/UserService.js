const InvalidParamError = require('../../../../errors/InvalidParamError');
const QueryError = require('../../../../errors/QueryError');
const PermissionError = require('../../../../errors/PermissionError');
const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {

    async encryptPassword(password){
        const saltRounds = 10;
        const encryptedPassoword = await bcrypt.hash(password, saltRounds);
        return encryptedPassoword;
    }

    async creation(body) {
        if (body.name === "" || body.email === "" || body.password === "" || body.role === "") {
            throw new QueryError("Incomplete user characteristics");
        }
        if (body.role === "admin"){
            throw new PermissionError ("it is not possible for a user to create an admin role");
        }
        const user = await User.findOne({where: {email: body.email}});
        if(user){
            throw new QueryError("E-mail already registered")
        }else{
            const user = {
                name: body.name,
                email: body.email,
                password: body.password,
                role: body.role,
            }
            user.password = await this.encryptPassword(body.password);

            await User.create(user);
        }

        
    }

    async getAll() {
        const users = await User.findAll({ raw: true });
        if (users.length === 0) {
            throw new QueryError("No user found");
        }
        return users;
    }
    
    async getById(id){
        const users = await User.findByPk(id);
        if (!users){
            throw new QueryError("No user found");
        }
        return users;
    }

    async getByEmail(email){
        const users = await User.findOne({where: {email: req.body.email}})
        if (!users){
            throw new QueryError("No user found");
        }
        return users;
    }

    async newUser(id, body) {
        const userID = await User.findByPk(id);
        if (body.name === "" || body.email === "" || body.password === "" || body.role === "") {
            throw new QueryError("Incomplete user characteristics");
        }
        
        if (body.password){
            body.password = await this.encryptPassword(body.password);
        }
        if (userID === null) {
            throw new QueryError('No user were found with this ID');
        } else {
            await User.update(body, { where: { id: id } });
        }
    }
    async deleteUser(id) {
        const userID = await User.findByPk(id);
        if (userID === null) {
            throw new InvalidParamError('No artists were found with this ID');
        }
        return await userID.destroy();
    }
}



module.exports = new UserService();