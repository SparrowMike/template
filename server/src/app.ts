import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose'

const session = require('express-session')
const cors = require('cors');
const bodyParser = require('body-parser');

//?============Models============
import userModel from './models/user'

//?============Routes=============
import toDoRoutes from './routes/todo';
import userRoutes from './routes/user';

const app: Application = express();

const PORT: string | number = process.env.PORT || 5000;

app.use(cors());

// const uri = process.env.MONGO_DB || 'mongodb://localhost:27017/template';
const uri = 'mongodb://localhost:27017/template';

//?==========Middleware==========
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SECRET }))

//?===========Routes=============
app.use(toDoRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(uri);

app.get('/api/data', async (req: Request, res: Response, next: NextFunction) => {
    const user = await userModel.find({});
    res.send(user);
});

mongoose.connection
    .on("error", console.error.bind(console, "connection error: "))
    .once("open", function () {
        console.log("Connected successfully");
    })

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});