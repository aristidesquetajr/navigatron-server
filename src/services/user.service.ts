import "dotenv/config";

import { OkPacket } from "mysql2";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { Database } from "../util/database";
import { AppError } from "../errors/AppError";
import { User } from "../model/User";

interface ICreateUser {
  email: string;
  password: string;
}

interface IAuthenticate {
  email: string;
  password: string;
}

interface IAuthenticateResponse {
  token: string;
  user: {
    email: string;
  };
}

export class UserService {
  constructor(private database: Database) {}

  async create({ email, password }: ICreateUser): Promise<void> {
    const userAlreadyExists = await this.findUserByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User Already exists!");
    }

    const sql = `INSERT INTO users (email, password) VALUES (?, ?);`;
    const passwordHash = await hash(password, 8);
    const params = [email, passwordHash];

    await new Promise<Number>((resolve, reject) => {
      this.database.conn.query<OkPacket>(sql, params, (err, res) => {
        if (err) reject(err.message);

        resolve(res.insertId);
      });
    });
  }

  private findUserByEmail(email: string): Promise<User | undefined> {
    const sql = `SELECT * FROM users WHERE email = '${email}';`;

    return new Promise((resolve, reject) => {
      this.database.conn.query<User[]>(sql, (err, res) => {
        if (err) reject(err.message);

        resolve(res?.[0]);
      });
    });
  }

  async authenticate({
    email,
    password,
  }: IAuthenticate): Promise<IAuthenticateResponse> {
    const user = await this.findUserByEmail(email);

    if (!user) throw new AppError("Username or password incorrect!");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError("Username or password incorrect!");

    const token = sign({}, String(process.env.JWT_SECRET), {
      subject: user.id?.toString(),
      expiresIn: "1d",
    });

    const tokenReturn: IAuthenticateResponse = {
      token,
      user: {
        email: user.email,
      },
    };

    return tokenReturn;
  }

  findUserById(id: string): Promise<User | undefined> {
    const sql = `SELECT * FROM users WHERE id = ${id};`;

    return new Promise((resolve, reject) => {
      this.database.conn.query<User[]>(sql, (err, res) => {
        if (err) reject(err.message);

        resolve(res?.[0]);
      });
    });
  }
}
