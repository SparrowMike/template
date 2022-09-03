import express, { Application } from 'express';
import mongoose from 'mongoose'
const cors = require('cors');

const app: Application = express();
const PORT: string | number = process.env.PORT || 5000;

//?============Routes=============
import toDoRoutes from './routes/todoRoutes';
import userRoutes from './routes/userRoutes';

// const uri = process.env.MONGO_DB || 'mongodb://localhost:27017/template';
const uri = 'mongodb://localhost:27017/template';

//?==========Middleware==========
app.use(cors())
app.use(express.json());

//?===========Routes=============
app.use(toDoRoutes)
app.use('/api/user', userRoutes)

//?===========Connect=============
mongoose.connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connected to DB & listening on port', PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })