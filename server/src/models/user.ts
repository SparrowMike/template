import { UserType, UserModel } from "../types/user"
import { model, Schema } from "mongoose"
import validator from 'validator';
const bcrypt = require('bcrypt')

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
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

userSchema.statics.signup = async function(email: string, username: string, password: string) {
    //? ===== validation =====
    if (!username || !password) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const exists = await this.findOne({ username });

    if(exists) {
        throw Error('Username already taken');
    }
    
    const hash = await bcrypt.hash(password, 12);
    const user = await this.create({ email, username, password: hash })

    return user 
}

userSchema.statics.findAndValidate = async function(username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
};

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next();
});

export default model<UserType, UserModel>("User", userSchema);