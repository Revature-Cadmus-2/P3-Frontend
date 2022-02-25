import { Comment } from "./Comment";

export interface Root {
    id: number;
    title: string;
    message: string;
    totalVote: number;
    dateTime: Date;
    userName: string;
    comments: Comment[];
}
