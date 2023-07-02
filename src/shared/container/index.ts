import { container } from "tsyringe";

import { Database } from "../../util/database";
import { UserService } from "../../services/user.service";
import { NavigationService } from "../../services/navigation.service";

container.registerSingleton("Database", Database);
container.registerSingleton("UserService", UserService);
container.registerSingleton("NavigationService", NavigationService);
