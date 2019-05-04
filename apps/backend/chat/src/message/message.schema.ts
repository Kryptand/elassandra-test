import { Schema } from 'mongoose';

const message = new Schema({
  message: { type: String, required: true },
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  read_by: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  delievered_to: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  room_ref: { type: Schema.Types.ObjectId, ref: 'Room' },
  date: { type: Date, default: Date.now }
});

export const MessageSchema = message;
