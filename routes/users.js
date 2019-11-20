const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @route 	 POST api/users
// @route 	 Create new user
// @route 	 Public
router.post('/', [
    check(['name', 'password'], 'Por favor, ingrese un nombre y/o contraseña').not().isEmpty(),
    check('email', 'Por favor, ingrese un correo válido').isEmail(),
    check('password', 'Contraseña debe poseer mínimo 6 carácteres').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, password, userType } = req.body;
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        
        if(user) {
            return res.status(400).json({ msg: 'El correo ingresado se encuentra en uso' });
        }

        // Asign the user with all documents from MongoDB, including the ID for later use JWT
        user = new User({
            name,
            email,
            password,
            userType
        });

        const salt = await bcrypt.genSalt(10);
        
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();

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