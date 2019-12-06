const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config;
const path = require('path');
dotenv({ path: './config/config.env' });

const app = express();

// Conect to Database
connectDB();

app.use(express.json({ extended: false}));

// Define routes
app.use('/api/food-menu', require('./routes/foodMenu'));
app.use('/api/food-order', require('./routes/foodOrder'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));