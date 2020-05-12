import { Message, User } from "./index";

export class ChatMessage extends Message {
  constructor(from: User, content: string) {
    super(from, content);
  }
}
