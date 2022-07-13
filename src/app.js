const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mercadopago = require("mercadopago");

const productRoutes = require('./routes/product.js');
const categoryRoutes = require('./routes/category.js');
const usersRoutes = require('./routes/users.js');
const loginRoutes = require('./routes/login.js');
const shopRoutes = require('./routes/shop.js');
const planRoutes = require('./routes/plan.js');
const saleRoutes = require('./routes/sale.js');
const ofertaRoutes = require('./routes/oferta.js')
//Settings
dotenv.config({ path: './config.env' });
app.set('port', process.env.APP_PORT || 8000);

mercadopago.configure({
	access_token: 'APP_USR-2601953337811157-060917-330c5b4f8ff4addc8c6194b7d74724a8-1140002070',
});

//Middlewares
app.use(bodyParser.json());

//Routes
app.use("/ofertas", ofertaRoutes)
app.use("/category", categoryRoutes)
app.use("/products", productRoutes);
app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/shop", shopRoutes);
app.use("/plan", planRoutes);
app.use("/sale", saleRoutes);


//Start server
app.listen(8000, () => console.log('http://localhost:8000/'));