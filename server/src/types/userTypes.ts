import { Model, Document } from "mongoose"

export interface UserType extends Document {
  email: string
  password: string
}

export interface UserModel extends Model<UserType> {
  signup( email: string, password: string): UserType
  login(email: string, password: string): UserType
  checker(_if: string): Record<string,any>
}
