import { UserType } from "./user";

export interface DiscussionType {
    id: number;
    class_id: number;
    user_id: number;
    user: UserType;
    message: string;
    created_at: string;
}

export type DiscussionPayloadType = {
    class_id: number;
    user_id: number;
    message: string;
};

