import { AppError } from "../errors/AppError";
import { Database } from "../util/database";

import { convertTextInHash } from "../util/hash";

interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export class UserService {
  constructor(private database: Database) {}

  async create({ username, email, password }: ICreateUser): Promise<void> {
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`;
    const newPassword = await convertTextInHash(password);
    const params = [username, email, newPassword];

    this.database.conn.query(sql, params, (err, result) => {
      if (err) {
        throw new AppError(err.message);
      }
    });
  }
}
