import { CourseType } from "./course";

export interface CategoryType {
  id: number;
  name: string;
  description?: string | null;
  courses: CourseType[];
};

export interface CategoryPayloadType {
  name: string;
  description?: string | null;
};