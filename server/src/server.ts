import express, { Application, Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import ExpressError from './utils/ExpressError'

const app: Application = express();
const PORT: string | number = process.env.PORT || 5000;

//?============Routes=============
import toDoRoutes from './routes/todoRoutes';
import userRoutes from './routes/userRoutes';

// const uri = process.env.MONGO_DB || 'mongodb://localhost:27017/template';
const uri = 'mongodb://localhost:27017/template';

//?==========Middleware==========
app.use(express.json());

//?===========Routes=============
app.use('/api/todo', toDoRoutes)
app.use('/api/user', userRoutes)

app.all('*', (req, res, next) => {
  res.send('404!')
});

app.use((err: any | unknown, req: Request, res: Response, next: NextFunction) => {
  // console.log(err instanceof ExpressError)
  // if (err instanceof ExpressError) {
    const { message = 'Something went wrong', status = 500} = err;
    res.status(status).send(err)
  // }
});

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