require('dotenv').config();

const { initDb } = require('./services/mongoose.service');
initDb();

const express = require('express');
const cors = require('cors');
const app = express();

const itemsRouter = require('./routers/itemsRouter');
const usersRouter = require('./routers/usersRouter')
const cartRouter = require('./routers/cartRouter')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/items', itemsRouter);
app.use('/api/users', usersRouter);
app.use('/api/carts', cartRouter);

app.listen(8000);


