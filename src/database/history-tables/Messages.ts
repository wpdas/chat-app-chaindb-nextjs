// Used to create a registry of new messages

export type Message = {
  // userAvatarImage: string;
  username: string;
  message: string;
  b64Image?: string;
  timestamp: number;
};

export class MessagesTable {
  public username?: string;
  public message?: string;
  public b64Image?: string;
  public timestamp?: number;
}
