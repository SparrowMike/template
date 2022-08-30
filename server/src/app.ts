import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose'

const cors = require('cors');

// const bodyParser = require('body-parser');

const userModel = require("./models/user.ts");
import todoRoutes from "./routes"

const app: Application = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());

const uri = process.env.MONGO_DB || 'mongodb://localhost:27017/test';

app.use(cors())
app.use(todoRoutes)
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

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