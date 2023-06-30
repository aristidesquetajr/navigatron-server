import { Router } from 'express';

import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { Database } from '../util/database';

export const userRoutes = Router();

const database = new Database()

const userService = new UserService(database)

const userController = new UserController(userService)


userRoutes.post("/", (req, res) => userController.createAccount(req, res));