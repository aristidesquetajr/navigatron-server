import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { AppError } from "../errors/AppError";

import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async createAccount(request: Request, response: Response): Promise<Response> {
    const userSchema = z.object({
      username: z.string().nonempty(),
      email: z.string().email(),
      password: z.string().nonempty(),
    });

    try {
      const { username, email, password } = userSchema.parse(request.body);
  
      await this.userService.create({ username, email, password })
  
      return response.status(201).send();

    } catch(err) {
      return response.status(400).send(err)
    }
  }
}
