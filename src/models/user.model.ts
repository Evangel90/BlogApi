import { Schema, model } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'reader | editor | admin';
}

const userSchema = new Schema <IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true},
    role: { type: String, required: true }
});


const User = model<IUser>('User', userSchema);

export default User;