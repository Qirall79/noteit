import mongoose, { Schema, model } from "mongoose";

interface IUser {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
});

const User = model("User", UserSchema);

export default User;
