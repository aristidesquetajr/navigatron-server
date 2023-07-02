import { RowDataPacket } from "mysql2";
import { User } from "./User";

export interface Navigation extends RowDataPacket {
  id: number;
  fkUser: number;
  currentLocate: string;
  nextLocate: string;
  isActiveNavigation: boolean;
  duration: string;

  createdAt: Date;
  updatedAt: Date;
}
