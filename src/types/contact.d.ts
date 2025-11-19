import { StudentType, UserType } from './user';

export interface ContactType {
  id: number;
  sender_id: number;
  sender: UserType;
  message: string;
  reply: string | null;
  created_at: string;
  updated_at: string;
}


export type ContactPayloadType = {
  sender_id: number;
  message: string;
  reply?: string;
};

export interface GroupContactType {
  student: StudentType;
  messages: ContactType[];
}

