const express = require('express');
const router = express.Router();

// @route 	 GET food-menu
// @desc 	 Get all menus
// @access 	 Private
router.get('/', (req, res) => {
    res.send('Get all menus user');
})

// @route 	 GET food-menu/:id
// @desc 	 Get logged in user
// @access 	 Private
router.get('/:id', (req, res) => {
    res.send('Get single menu');
})

// @route 	 POST food-menu
// @desc 	 Create new food menu
// @access 	 Private
router.post('/', (req, res) => {
    res.send('Create menu')
})

// @route 	 PUT food-menu/:id
// @desc 	 Update Menu
// @access 	 Private
router.put('/:id', (req, res) => {
    res.send('Update menu')
})

// @route 	 DELETE food-menu/:id
// @desc 	 Remove Menu
// @access 	 Private
router.delete('/:id', (req, res) => {
    res.send('Delete menu')
})

module.exports = router;