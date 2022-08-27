import { model, Schema } from "mongoose"

const UserSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const User = model("User", UserSchema);

module.exports = User;