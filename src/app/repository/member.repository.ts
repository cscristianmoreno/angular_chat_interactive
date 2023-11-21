import { memberStruct } from "../models/member.model";

export declare interface MemberRepository {
    save(member: memberStruct): void;

    leave(member: memberStruct): void;

    findById(id: number | string): memberStruct | undefined;
    
    findAllById(group_id: number | string): memberStruct[];

    findAllByGroupId(group_id: number | string): memberStruct[];

}