const express = require('express');
const cors = require('cors');
const app = express();
const bp = require('body-parser')
const itemsRouter = require('./routers/itemsRouter');
const usersRouter = require('./routers/usersRouter')
const cartRouter = require('./routers/cartRouter')
const ordersRouter = require('./routers/ordersRouter')
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended : false}));
require('./configs/database');
app.use('/api/items', itemsRouter);
app.use('/api/users', usersRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', ordersRouter)
app.listen(8000);


