const express = require('express');
const router = express.Router();

// @route 	 POST
// @route 	 Create new user
// @route 	 Public
router.post('/', (req, res) => {
    res.send('Create user');
})

module.exports = router;