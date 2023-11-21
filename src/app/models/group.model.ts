export interface groupStruct {
    id: number,
    owner_id: number | string,
    name: string,
    date: string,
    members?: number,
    max_members: number
}