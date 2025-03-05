// Used to create a registry of new messages

export type Message = {
  // userAvatarImage: string;
  username: string;
  message: string;
  b64Image?: string;
  timestamp: number;
};

// Table
export type MessagesSchema = {
  username?: string;
  message?: string;
  b64Image?: string;
  timestamp?: number;
};
