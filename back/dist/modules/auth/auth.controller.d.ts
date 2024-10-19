import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    SignUp(createUser: SignUpDto): Promise<Object>;
    SignIn(userCredentials: SignInDto): Promise<Object>;
}
