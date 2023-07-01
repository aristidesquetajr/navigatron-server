import { Request, Response } from "express";
import { z } from "zod";

import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async createAccount(request: Request, response: Response): Promise<Response> {
    const userSchema = z.object({
      username: z.string().nonempty().toLowerCase(),
      email: z.string().email(),
      password: z.string().nonempty(),
    });

    const { username, email, password } = userSchema.parse(request.body);

    await this.userService.create({ username, email, password });

    return response.status(201).send();
  }

  async authenticate(request: Request, response: Response): Promise<Response> {
    const authSchema = z.object({
      username: z.string().nonempty().toLowerCase(),
      password: z.string().nonempty(),
    });

    const { username, password } = authSchema.parse(request.body);

    const token = await this.userService.authenticate({ username, password })

    return response.json(token);
  }
}
