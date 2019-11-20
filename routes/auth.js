const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route 	 GET api/auth
// @route 	 Get logged in user
// @route 	 Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.msg);
        res.status(400).send('Server error');
    }
})

// @route 	 POST api/auth
// @route 	 Auth user and get token
// @route 	 Public
router.post('/', [
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'Es necesario ingresar una constraseña').exists()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(!user) return res.status(400).json({ msg: 'Credenciales incorrectas' });

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

        const payload = {
            user: {
                id: user.id,
                userType: user.userType,
                name: user.name
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if(err) throw err;
            return res.json({ token });
        });
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error');
    }
    
})

module.exports = router;