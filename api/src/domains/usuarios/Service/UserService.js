const { QueryError } = require('sequelize');
const User = require('../models/User');

class UserService{

    async creation(body){
        await User.create(body);
    }

    async getAll(){
        const users = await User.findAll();

        if (!users){
            throw new QueryError('There are no users in the system.');
        }

        return users;
    }
    async newUser(id, body){
        const findUser = await User.findByPk(id);

        const name = body.name;
        const email = body.email;
        const password = body.password;
        const role = body.role;

        const userData = {
            name,
            email,
            password,
            role
        };

        if (!userData){
            throw new QueryError('No user was added.');
        } else{
            await User.update(userData, {where: {id: id}});
        }
    }
    async deleteUser(id){
        const user = await User.findByPk(id);
        return await user.destroy();
    }
}



module.exports = new UserService();