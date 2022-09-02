import { UserType, UserModel } from "../types/user"
import { model, Schema } from "mongoose"
const bcrypt = require('bcrypt')

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.statics.findAndValidate = async function(username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
};

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next();
});

export default model<UserType, UserModel>("User", UserSchema);