const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class SessionController {
    async create(req, res) {
        try {
            const { login, password } = req.body;
            const user = await User.findOne({ login }).select('+password');
            if (!user) {
                return res.status(401).json({ error: 'Login ou senha inválidos.' });
            }
            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Login ou senha inválidos.' });
            }
            user.password = undefined;
            const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
                expiresIn: '1d', // O token expira em 1 dia
            });
            return res.json({ user, token });
        } catch (err) {
            return res.status(500).json({ error: 'Falha no login, tente novamente.' });
        }
    }
}
module.exports = new SessionController();