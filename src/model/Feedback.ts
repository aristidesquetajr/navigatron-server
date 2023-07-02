import { RowDataPacket } from "mysql2";
import { User } from "./User";

export interface Feedback extends RowDataPacket {
  id: number;
  message: string;
  classification: number;

  fkUser: User;
}
