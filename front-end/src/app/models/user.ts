import { Followings } from "./Followings";
import { FollowedBy } from "./FollowedBy";

export interface User {
    id?: number;
    email?: string;
    name?: string;
    username: string;
    followings?: Followings[];
    followers?: FollowedBy[];
    notifications?: Notification[];
}