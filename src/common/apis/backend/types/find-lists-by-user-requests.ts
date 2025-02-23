export type List = {
    id: number,
    name: string,
    visibility: string,
    countMovie: number,
    countTV: number
}

export type FindListsByUserResponseType = {
    singleLists: List[],
    sharedLists: List[]
}