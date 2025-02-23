import { SuccessResponseType } from "./success-response.type";

export type RegisterUserPayloadType = {
    name: string,
    nickname: string,
    password: string
}

export type RegisterUserResponseType = SuccessResponseType & {}