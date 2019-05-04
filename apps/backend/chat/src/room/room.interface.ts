import { User } from '../user/user.interface';
import { Document } from 'mongoose';
export interface Room extends Document {
  readonly name: string;
  readonly users: User[];
  readonly messages: string[];
  readonly created_at: Date;
  readonly updated_at: Date;
}
