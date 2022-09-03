import { UserType, UserModel } from "../interfaces/userTypes"
import { model, Schema } from "mongoose"
import validator from 'validator';
const bcrypt = require('bcrypt')

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.statics.signup = async function( email: string, password: string) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const exists = await this.findOne({ email });

    if(exists) {
        throw Error('email already taken');
    }
    
    const hash = await bcrypt.hash(password, 12);
    const user = await this.create({ email, password: hash })

    return user 
}

userSchema.statics.login = async function(email: string, password: string) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({ email });
    
    if (!user) {
        throw Error('Incorrect email')
    }
    
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw Error('Incorrect password');
    }

    return user
}

export default model<UserType, UserModel>("User", userSchema);