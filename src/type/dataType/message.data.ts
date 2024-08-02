import { IUserDataType } from "./user.data";

export interface IMessageDataType {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  updatedAt: string;
  createdAt: string;
  userId: string | null;
  sender: IUserDataType;
  receiver: IUserDataType;
}
