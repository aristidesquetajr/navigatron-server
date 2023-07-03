import { inject, injectable } from "tsyringe";
import { OkPacket } from "mysql2";

import { Database } from "../util/database";

interface ICreateNavigation {
  fk_user: number;
  origin: string;
  destiny: string;
  duration: string;
}

@injectable()
export class NavigationService {
  constructor(@inject("Database") private database: Database) {}

  async createNavigation({
    fk_user,
    origin,
    destiny,
    duration,
  }: ICreateNavigation): Promise<void> {
    const sql =
      "INSERT INTO navigations (fk_user, origin, destiny, duration) VALUES (?, ?, ?, ?)";
    const params = [fk_user, origin, destiny, duration];

    await new Promise((resolve, reject) => {
      this.database.conn.query<OkPacket>(sql, params, (err, res) => {
        if (err) reject(err.message);

        resolve(res.insertId);
      });
    });
  }
}
