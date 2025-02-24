import { VisibilitiesEnum } from "../enums/visibilities.enum"
import { Content } from "./content.type"
import { SuccessResponseType } from "./success-response.type";

export type CreateListPayloadType = {
    name: string,
    visibility: VisibilitiesEnum,
    contents: Content[];
}

export type CreateListResponseType = SuccessResponseType & {}