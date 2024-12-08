import UserService from "../services/UserService";

import { CustomRequest, Res } from "../server";

class UserController {

    async getUser(req: CustomRequest, res: Res) {
        try {

            const id = req.queryParams?.get('id');
            const user = id ? await UserService.getById(id) : null;

            if (!user) {

                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    data: null,
                    errorMessage: 'пользователь не найден'
                }));

            } else {

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    data: user
                }));

            }

        } catch(error) {

            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                data: null,
                errorMessage: error instanceof Error ? error.message : 'ошибка на сервере'
            }));

        }
    }

    async addUser(req: CustomRequest, res: Res) {
        try {

            const newUserIdHash = await UserService.add(req.body);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                data: {
                    newUserIdHash
                }
            }));

        } catch(error) {

            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                data: null,
                errorMessage: error instanceof Error ? error.message : 'ошибка на сервере'
            }));

        }
    }

    async editUser(req: CustomRequest, res: Res) {
        try {

            const id = req.body._id;
            const name = req.body.name;
            const editedUser = await UserService.editName(id, name);

            if (!editedUser) {

                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    data: null,
                    errorMessage: 'пользователь не найден'
                }));

            } else {

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    data: editedUser
                }));

            }

        } catch(error) {

            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                data: null,
                errorMessage: error instanceof Error ? error.message : 'ошибка на сервере'
            }));

        }
    }

}

export default new UserController();
