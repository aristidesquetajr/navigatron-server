import { container } from "tsyringe";

import { UserService } from "../../services/user.service";
import { Database } from "../../util/database";

container.register(
  "UserService",
  UserService
);
