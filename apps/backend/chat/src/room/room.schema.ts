import { Schema } from 'mongoose';
import { UserSchema } from '../user/user.schema';

const room = new Schema({
  name: { type: String, required: true },
  users: [UserSchema],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export const RoomSchema = room;
