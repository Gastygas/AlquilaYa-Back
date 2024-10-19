import { UsersRepository } from "./users.repository";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getUsers(): () => Promise<any[]>;
}
