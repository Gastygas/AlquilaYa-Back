import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): () => () => Promise<any[]>;
    getUserById(id: string): void;
    changeUser(id: string, newUser: any): void;
    deleteUser(id: string): void;
}
