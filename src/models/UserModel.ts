import mongoose, { Model } from 'mongoose';

const User = new mongoose.Schema<IUser, UserModel>({
    name: { type: String, required: true },
    aboutMe: { type: String, required: true }
});

export default mongoose.model('User', User);

export interface IUser {
    name: string;
    aboutMe: string;
}

type UserModel = Model<IUser>;
