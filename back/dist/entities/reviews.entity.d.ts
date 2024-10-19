import { User } from "./user.entity";
export declare class Reviews {
    id: string;
    date: Date;
    description: string;
    stars: number;
    user: User;
}
