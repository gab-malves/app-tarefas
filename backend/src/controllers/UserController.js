const User = require('../models/User');

class UserController {
    async create(req, res) {
        try {
            const { login, password } = req.body;
            if (await User.findOne({ login })) {
                return res.status(400).json({ error: 'Este nome de usuário já está em uso.' });
            }
            const user = await User.create({ login, password });
            user.password = undefined;
            return res.status(201).json({ user });
        } catch (err) {
            return res.status(500).json({ error: 'O registro falhou.' });
    }
    }
}

module.exports = new UserController();