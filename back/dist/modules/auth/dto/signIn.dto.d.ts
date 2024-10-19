import { SignUpDto } from "./signUp.dto";
declare const SignInDto_base: import("@nestjs/common").Type<Pick<SignUpDto, "email" | "password">>;
export declare class SignInDto extends SignInDto_base {
}
export {};
