import express, { Application, Request, Response, NextFunction } from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');
import mongoose from 'mongoose'
const userModel = require("./../models/user.js");

const app: Application = express();

require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;

app.use(cors());

const url = 'mongodb://localhost:27017/test';

mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/data', async (req: Request, res: Response, next: NextFunction) => {
    // const user = await userModel.findOne({id: 123});
    const user = await userModel.find({});
    res.send(user);
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});