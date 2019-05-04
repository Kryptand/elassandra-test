import { Document } from 'mongoose';
export interface Message extends Document {
  readonly message: string;
  readonly from: string;
  readonly to: string[];
  readonly read_by: string[];
  readonly delivered_to: string[];
  readonly room_ref: string;
  readonly date: Date;
}
