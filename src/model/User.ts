import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
	id?: number
	username: string
	password: string
	email: string
	isActiveAccount: boolean
	
	createdAt: Date
	updatedAt: Date
}