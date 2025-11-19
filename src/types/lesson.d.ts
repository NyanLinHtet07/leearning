import { CourseType } from './course';

export interface LessonType {
  id: number;
  course_id: number;
  course: CourseType;
  description: string;
  title: string;
  youtube_link: string;
  is_locked: number;
  classroom_lesson_locks?: Array;
}

export interface LessonPayloadType {
  course_id?: number | string;
  description: string | null;
  title: string | null;
  youtube_link: string | null;
}
