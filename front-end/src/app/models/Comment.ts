import { Vote } from "./vote";

export interface Comment {
    id?: number;
    parentId: number;
    rootId: number;
    message: string;
    totalVote: number;
    dateTime: Date;
    userName: string;
    votes: Vote[];
    comments?: Comment[];
}