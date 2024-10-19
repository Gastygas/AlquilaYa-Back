import { PickType } from "@nestjs/swagger";
import { SignUpDto } from "./signUp.dto";

export class SignInDto extends PickType(SignUpDto,[
    'email','password'
]){

}