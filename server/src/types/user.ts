import { Model, Document } from "mongoose"

export interface UserType extends Document {
  username: string
  password: string
}

export interface UserModel extends Model<UserType> {
  findAndValidate(username: string, password: string): UserType | false;
}