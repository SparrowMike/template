import { Response, Request  } from 'express'
import { UserType } from '../types/userTypes'
import User from '../models/userModel'
const jwt = require('jsonwebtoken');

import { catchAsync } from '../middleware/catchAsync';

const createToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = await User.login(email, password)
    const token = createToken(user._id);
    res.status(200).json({ user, token })
});

const signup = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user: UserType = await User.signup(email, password)
    const token = createToken(user._id);
    res.status(200).json({ user, token })
});

const getUsers = async (req: Request, res: Response) => {
    const user = await User.find({});
    res.send(user);
}

const deleteAll = async (req: Request, res: Response) => {
    const user = await User.deleteMany({});
    res.send(user);
}

export { signup, login, getUsers, deleteAll }