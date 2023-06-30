import { OkPacket } from "mysql2";

import { Database } from "../util/database";

import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError";
import { User } from "../model/User";

interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export class UserService {
  constructor(private database: Database) {}

  async create({ username, email, password }: ICreateUser): Promise<void> {
    const userAlreadyExists = await this.findUserByUsername(username);

    if (userAlreadyExists) {
      throw new AppError("User Already exists!");
    }

    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`;
    const passwordHash = await bcrypt.hash(password, 8);
    const params = [username, email, passwordHash];

    await new Promise<Number>((resolve, reject) => {
      this.database.conn.query<OkPacket>(sql, params, (err, res) => {
        if (err) reject(err.message);

        resolve(res.insertId);
      });
    });
  }

  private findUserByUsername(username: string): Promise<User | undefined> {
    const sql = `SELECT * FROM users WHERE username = '${username}';`;

    return new Promise((resolve, reject) => {
      this.database.conn.query<User[]>(sql, (err, res) => {
        if (err) reject(err.message);

        resolve(res?.[0]);
      });
    });
  }
}
