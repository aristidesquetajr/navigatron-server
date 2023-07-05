import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { z } from "zod";

import { FeedbackService } from "../services/feedback.service";
import { AppError } from "../errors/AppError";
import { tzem } from "../util/tzem";

@injectable()
export class FeedbackController {
  constructor(
    @inject("FeedbackService") private feedbackService: FeedbackService
  ) {}

  async createFeedback(
    request: Request,
    response: Response
  ): Promise<Response> {
    const fk_user = Number(request.user_id);
    const fk_navigation = Number(request.query.navigation);

    const feedbackSchema = z.object({
      message: z.string().nonempty(),
      classification: z.string().nonempty(),
    });

    const isFeedbackSchemaValid = feedbackSchema.safeParse(request.body);

    if (!isFeedbackSchemaValid.success) {
      throw new AppError(tzem(isFeedbackSchemaValid.error));
    }

    const { message, classification } = isFeedbackSchemaValid.data;

    await this.feedbackService.createFeedback({
      fk_user,
      fk_navigation,
      message,
      classification,
    });

    return response.status(201).send();
  }

  async listFeedbackByUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user_id } = request;

    const Feedbacks = await this.feedbackService.listFeedbackByUser(user_id);

    return response.json(Feedbacks);
  }
}
