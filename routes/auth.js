const express = require('express');
const router = express.Router();

// @route 	 GET auth
// @route 	 Get logged in user
// @route 	 Private
router.get('/', (req, res) => {
    res.send('Get logged user');
})

// @route 	 POST auth
// @route 	 Auth user and get token
// @route 	 Public
router.get('/', (req, res) => {
    res.send('Log in user')
})

module.exports = router;