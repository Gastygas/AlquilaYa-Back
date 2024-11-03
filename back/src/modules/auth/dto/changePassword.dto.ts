import { PickType } from "@nestjs/swagger";
import { SignUpDto } from "./signUp.dto";

export class changePasswordDto extends PickType(SignUpDto,['confirmPassword','password','email']){

}