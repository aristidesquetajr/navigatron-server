import { RowDataPacket } from "mysql2";

export interface Navigation extends RowDataPacket {
  id: number;
  currentLocate: string;
  nextLocate: string;
  isActiveNavigation: boolean;
  duration: Date;

  createdAt: Date;
  updatedAt: Date;
}
