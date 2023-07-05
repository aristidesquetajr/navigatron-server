import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { z } from "zod";

import { NavigationService } from "../services/navigation.service";
import { AppError } from "../errors/AppError";
import { tzem } from "../util/tzem";

@injectable()
export class NavigationController {
  constructor(
    @inject("NavigationService") private navigationService: NavigationService
  ) {}

  async createNavigation(
    request: Request,
    response: Response
  ): Promise<Response> {
    const fk_user = Number(request.user_id);

    const navigationSchema = z.object({
      origin: z.string().nonempty(),
      destiny: z.string().nonempty(),
      duration: z.string(),
    });

    const isNavigationSchemaValid = navigationSchema.safeParse(request.body);

    if (!isNavigationSchemaValid.success) {
      throw new AppError(tzem(isNavigationSchemaValid.error));
    }

    const { origin, destiny, duration } = isNavigationSchemaValid.data;

    await this.navigationService.createNavigation({
      fk_user,
      origin,
      destiny,
      duration,
    });

    return response.status(201).send();
  }

  async listNavigationByUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user_id } = request;

    const navigations = await this.navigationService.listNavigationByUser(
      user_id
    );

    return response.json(navigations);
  }
}
