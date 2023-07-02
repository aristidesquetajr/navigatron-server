import { Router } from "express";
import { navigationRoutes } from "./navigation.routes";
import { userRoutes } from "./user.routes";

export const router = Router();

router.use("/users", userRoutes);
router.use("/navigations", navigationRoutes);
