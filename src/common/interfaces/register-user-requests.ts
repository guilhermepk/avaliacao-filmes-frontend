import { SuccessResponseInterface } from "./success-response.interface";

export interface RegisterUserPayloadInterface {
    name: string,
    nickname: string,
    password: string
}

export interface RegisterUserResponseInterface extends SuccessResponseInterface {}