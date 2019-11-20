const express = require('express');
const router = express.Router();

const FoodOrder = require('../models/FoodOrder');
const auth = require('../middleware/auth');

// @route 	 GET api/food-order
// @desc 	 Get all orders
// @access 	 Private
router.get('/', auth, async (req, res) => {
    try {
        if (req.user.userType === 0 ) {
            const foodOrder = await FoodOrder.find({ user: req.user.id }).sort({ date: -1 });
            res.json(foodOrder);
        } else if (req.user.userType === 1) {
            const foodOrder = await FoodOrder.find().sort({ date: -1 });
            res.json(foodOrder);
        }
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
router.post('/', auth, async (req, res) => {
    const { name, category, description, price, orderDetails  } = req.body;
    try {
        // @todo validate that promo exists (after dispatch this project this tuesday xd)   
        const user = req.user.id;
        const userName = req.user.name;

        let foodOrder = await FoodOrder.create({
            user,
            userName,
            name,
            category,
            description,
            price,
            orderDetails
        })

        console.log(foodOrder);

        return res.json(foodOrder);
    } catch (err) {
        console.error(err.msg);
        res.status(400).send('Server error');
    }
})

// @route 	 PUT api/food-menu/:id
// @desc 	 Update Menu
// @access 	 Private
router.put('/:id', auth, async (req, res) => {
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

// @route 	 DELETE api/food-order/:id
// @desc 	 Remove Order
// @access 	 Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let foodOrder = await FoodOrder.findById(req.params.id);

        if(!foodOrder) return res.status(404).json({ msg: 'El menú no ha sido encontrado'});

        await FoodOrder.findByIdAndRemove(req.params.id);
        
        res.json({ msg: 'Menú eliminado exitosamente'});
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server error');
    }
})

module.exports = router;