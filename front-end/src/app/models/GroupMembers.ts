import { User } from "./user";

export interface GroupMembers {
    id?: number;
    groupId: number;
    memberUserId: number;
    groupName: string;
    // groups?: Group[];
    // user: User;
}