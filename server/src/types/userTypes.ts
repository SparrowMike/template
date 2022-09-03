import { Model, Document } from "mongoose"

export interface UserType extends Document {
  username: string
  password: string
}

export interface UserModel extends Model<UserType> {
  signup( username: string, password: string): UserType
  login(username: string, password: string): UserType
}
