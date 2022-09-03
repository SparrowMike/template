import { UserType, UserModel } from "../types/userTypes"
import { model, Schema } from "mongoose"
import validator from 'validator';
const bcrypt = require('bcrypt')

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.statics.signup = async function( username: string, password: string) {
    if (!username || !password) {
        throw Error('All fields must be filled');
    }
    // if (!validator.isEmail(email)) {
    //     throw Error('Email is not valid');
    // }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const exists = await this.findOne({ username });

    if(exists) {
        throw Error('Username already taken');
    }
    
    const hash = await bcrypt.hash(password, 12);
    const user = await this.create({ username, password: hash })

    return user 
}

userSchema.statics.login = async function(username: string, password: string) {
    if (!username || !password) {
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({ username });
    
    if (!user) {
        throw Error('Incorrect username')
    }
    
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw Error('Incorrect password');
    }

    return user
}

export default model<UserType, UserModel>("User", userSchema);