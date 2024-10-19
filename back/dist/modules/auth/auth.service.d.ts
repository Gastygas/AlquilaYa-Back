import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    SignUp(newUser: SignUpDto): Promise<Object>;
    SignIn(userCredentials: SignInDto): Promise<Object>;
}
