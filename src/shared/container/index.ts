import { container } from "tsyringe";

import { Database } from "../../util/database";
import { UserService } from "../../services/user.service";

container.registerSingleton("Database", Database);
container.registerSingleton("UserService", UserService);
