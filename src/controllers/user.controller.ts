import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";
import { z } from "zod";

import { UserService } from "../services/user.service";
import { AppError } from "../errors/AppError";
import { tzem } from "../util/tzem";

@injectable()
export class UserController {
  constructor(@inject("UserService") private userService: UserService) {}

  async createAccount(request: Request, response: Response): Promise<Response> {
    const userSchema = z.object({
      email: z.string().email({ message: "Invalid" }),
      password: z.string().nonempty(),
    });

    const isUserSchemaValid = userSchema.safeParse(request.body);

    if (!isUserSchemaValid.success) {
      throw new AppError(tzem(isUserSchemaValid.error));
    }

    const { email, password } = isUserSchemaValid.data;
    
    await this.userService.create({ email, password });

    return response.status(201).send();
  }

  async authenticate(request: Request, response: Response): Promise<Response> {
    const authSchema = z.object({
      email: z.string().email({ message: "Invalid" }),
      password: z.string().nonempty(),
    });

    const isAuthSchemaValid = authSchema.safeParse(request.body);

    if (!isAuthSchemaValid.success) {
      throw new AppError(tzem(isAuthSchemaValid.error));
    }

    const { email, password } = isAuthSchemaValid.data;

    const token = await this.userService.authenticate({ email, password });

    return response.json(token);
  }
}
