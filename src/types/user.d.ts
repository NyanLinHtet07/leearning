import { EnrollType } from './enroll';

export interface UserType {
  id: number | undefined;
  cover: File | string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  roles: string[];
}

export interface StudentType {
  id: number;
  cover: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  enrollments: EnrollType[];
}

export interface ClassMateType {
  id: number,
  first_name: string;
  last_name: string;
  email: string
}

export interface TeacherType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
}

export interface payloadUser {
  id?: number;
  cover?: File | string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  password: string | number,
  cover?: string | null;
  role?: string;
}

export type UserPayloadType = | {
  id?: number;
  cover?: File | string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  password: string | number,
  cover?: string | null;
  role?: string;
} | FormData;
