import { Model, Document } from "mongoose"

export interface UserType extends Document {
  email: string
  username: string
  password: string
}

export interface UserModel extends Model<UserType> {
  findAndValidate(email:string, username: string, password: string): UserType | false;
  signup(email:string, username: string, password: string): UserType
}
