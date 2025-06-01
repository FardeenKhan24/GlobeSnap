const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();
    res.status(201).json(user);
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false, 
        sameSite: 'Lax', 
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ user,token });
};


const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
};



module.exports = { register, login, logout };
