// 1. server initialize
const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./routes/Users');
const bodyParser = require('body-parser');
// 1.2 require to read data with frontend
app.use(express.json());
// body-parser
app.use(bodyParser.json());
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
// 2. Routers
app.use('/users', userRouter);
// Static Images Folder
app.use('/Images', express.static('./Images'));
db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on ${process.env.PORT}`);
    })
})
