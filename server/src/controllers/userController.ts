import { Response, Request, NextFunction } from 'express'
import { UserType } from '../interfaces/userTypes'
import User from '../models/userModel'
const jwt = require('jsonwebtoken');

const createToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id);
        res.status(200).json({ user, token })
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body
    try {
        const user: UserType = await User.signup(username, password)
        const token = createToken(user._id);
        res.status(200).json({ user, token })
    } catch (error: unknown) { //? or type any to remove if / else 
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        } else {
            console.log('Unknown Failure', error)
        }
    }
}

const getUsers = async (req: Request, res: Response) => {
    const user = await User.find({});
    res.send(user);
}

const deleteAll = async (req: Request, res: Response) => {
    const user = await User.deleteMany({});
    res.send(user);
}

export { signup, login, getUsers, deleteAll }