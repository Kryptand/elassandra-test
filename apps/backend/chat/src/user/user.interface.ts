import { Document } from 'mongoose';
import { Message } from '../message/message.interface';
export interface Notification {
  readonly username: string;
  readonly message: Message;
  readonly notSeen: number;
}
export interface User extends Document {
  readonly username: string;
  readonly name: string;
  readonly avatar: { data: Buffer; contentType: string };
  readonly description: string;
  readonly online: boolean;
  readonly notifications: Notification[];
  readonly contacts: string[];
  readonly last_seen_at: Date;
  readonly created_at: Date;
  readonly updated_at: Date;
}
