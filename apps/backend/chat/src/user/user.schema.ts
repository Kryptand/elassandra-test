import * as mongoose from 'mongoose';
import { MessageSchema } from '../message/message.schema';

const user = new mongoose.Schema({
  username: { type: String, default: '', trim: true },
  name: { type: String, default: '', trim: true },
  avatar: { data: Buffer, contentType: String },
  description: { type: String, default: '', trim: true },
  online: { type: Boolean, default: false },
  notifications: [
    {
      username: { type: String, trim: true, index: { unique: true } },
      message: MessageSchema,
      notSeen: { type: Number, default: 0 }
    }
  ],
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  last_seen_at: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export const UserSchema = user;
