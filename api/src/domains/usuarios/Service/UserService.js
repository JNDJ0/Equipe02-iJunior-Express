const InvalidParamError = require('../../../../errors/InvalidParamError');
const QueryError = require('../../../../errors/QueryError');
const User = require('../models/User');

class UserService {

    async creation(body) {
        if (body.name === "" || body.email === "" || body.password === "" || body.role === "") {
            throw new QueryError("Carcteristicas de usuário incompletas");
        }
        await User.create(body);
    }

    async getAll() {
        const users = await User.findAll({ raw: true });
        if (users.length === 0) {
            throw new QueryError('There are no users in the system.');
        }
        return users;
    }
    async newUser(id, body) {
        const userID = await User.findByPk(id);
        if (body.name === "" || body.email === "" || body.password === "" || body.role === "") {
            throw new QueryError("Carcteristicas de usuário incompletas");
        }
        if (userID === null) {
            throw new QueryError('No user was added.');
        } else {
            await User.update(body, { where: { id: id } });
        }
    }
    async deleteUser(id) {
        const userID = await User.findByPk(id);
        if (userID === null) {
            throw new InvalidParamError('No user was found.');
        }
        return await userID.destroy();
    }
}



module.exports = new UserService();