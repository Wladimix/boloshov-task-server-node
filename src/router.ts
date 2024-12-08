import UserController from "./controllers/UserController";

import { Methods, route } from "./server";

export default function router() {
    route('/user/get',  Methods.GET,  UserController.getUser);
    route('/user/add',  Methods.POST, UserController.addUser);
    route('/user/edit', Methods.PUT,  UserController.editUser);
}
