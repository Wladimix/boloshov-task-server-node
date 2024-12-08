import HashService from "./HashService";
import UserModel, { IUser } from "../models/UserModel";

class UserService {

    async getById(id: string) {
        const user = await UserModel.findById(id);
        return user;
    }

    async add(user: IUser) {
        const newUser = await UserModel.create({
            name: user.name,
            aboutMe: user.aboutMe
        });

        return HashService.md5Hash(newUser._id);
    }

    async editName(id: string, name: string) {
        const user = await UserModel.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        
        return user;
    }

}

export default new UserService();
