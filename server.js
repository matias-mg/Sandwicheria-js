const express = require('express');

const app = express();

// Define routes
app.use('/food-menu', require('./routes/foodMenu'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));