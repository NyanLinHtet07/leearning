import api from "./api";
import type { StudentType } from '@/types/user'

export const getStudentEnroll = async (studentId: number | undefined): Promise<StudentType> => {
    try {
        const { data } = await api.get(`/v1/student/enroll/${studentId}`);
        return data?.data;
    } catch (error: any) {
        throw new Error(error.message);
    }

};