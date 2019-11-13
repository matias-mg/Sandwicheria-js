const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const FoodMenu = require('../models/FoodMenu');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User');

// @route 	 GET api/food-menu
// @desc 	 Get all menus
// @access 	 Private
router.get('/', auth, async (req, res) => {
    try {
        const foodMenus = await FoodMenu.find().sort({ date: -1 });
        res.json(foodMenus);
    } catch (err) {
        console.error(err.msg);
        res.status(400).send('Server error');
    }
})

// @route 	 GET api/food-menu/:id
// @desc 	 Get single menu
// @access 	 Private
router.get('/:id', (req, res) => {
    res.send('Get single menu');
})

// @route 	 POST api/food-menu
// @desc 	 Create new food menu
// @access 	 Private
router.post('/', [adminAuth, [
    check('name', 'Se requiere un nombre de promoción').not().isEmpty(),
    check('category', 'Seleccione la categoría de la promoción').exists(),
    check('description', 'Se requiere una descripción de la promoción').not().isEmpty(),
    check('price', 'Ingrese el precio de la promoción').exists()
]], async (req, res) => {
    // Check errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, description, price } = req.body;

    try {
        // Check if food menu exists
        let foodMenu = await FoodMenu.findOne({ name });
        if(foodMenu) {
            return res.json({ msg: 'El nombre de la promoción ya existe' });
        }

        foodMenu = await FoodMenu.create({
            name,
            category,
            description,
            price
        })

        return res.json(foodMenu);
    } catch (err) {
        console.error(err.msg);
        res.status(400).send('Server error');
    }
})

// @route 	 PUT api/food-menu/:id
// @desc 	 Update Menu
// @access 	 Private
router.put('/:id', adminAuth, async (req, res) => {
    const { name, category, description, price } = req.body;

    const menuFields = {};
    if(name) menuFields.name = name;
    if(category) menuFields.category = category;
    if(description) menuFields.description = description;
    if(price) menuFields.price = price;

    try {
        let foodMenu = await FoodMenu.findById(req.params.id);

        if(!foodMenu) return res.status(404).json({ msg: 'El menú no ha sido encontrado'});

        foodMenu = await FoodMenu.findByIdAndUpdate(req.params.id, { $set: menuFields }, { new: true });
        
        res.json(foodMenu);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server error');
    }
})

// @route 	 DELETE api/food-menu/:id
// @desc 	 Remove Menu
// @access 	 Private
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        let foodMenu = await FoodMenu.findById(req.params.id);

        if(!foodMenu) return res.status(404).json({ msg: 'El menú no ha sido encontrado'});

        await FoodMenu.findByIdAndRemove(req.params.id);
        
        res.json({ msg: 'Menú eliminado exitosamente'});
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server error');
    }
})

module.exports = router;