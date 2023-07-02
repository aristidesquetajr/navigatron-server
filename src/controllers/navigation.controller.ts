import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { NavigationService } from "../services/navigation.service";

@injectable()
export class NavigationController {
  constructor(
    @inject("NavigationService") private navigationService: NavigationService
  ) {}

  async createNavigation(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user_id } = request;

    const navigationSchema = z.object({
      currentLocate: z.string().nonempty(),
      nextLocate: z.string().nonempty(),
      duration: z.string(),
    });

    const { currentLocate, nextLocate, duration } = navigationSchema.parse(
      request.body
    );

    await this.navigationService.createNavigation({
      fk_user: Number(user_id),
      currentLocate,
      nextLocate,
      duration,
    });

    return response.status(201).send();
  }
}
