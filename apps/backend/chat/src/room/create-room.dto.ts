import { User } from '../user/user.interface';
export class CreateRoomDto {
  readonly name: string;
  readonly users: User[];
  readonly messages: string[];
  readonly created_at: Date;
  readonly updated_at: Date;
}
