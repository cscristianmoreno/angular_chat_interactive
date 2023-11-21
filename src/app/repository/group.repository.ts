import { groupStruct } from "../models/group.model";

export declare interface GroupRepository {
    
    create(group: groupStruct): void;

    delete(group: groupStruct): void;

    findById(id: number| string): groupStruct | undefined;

    findByOwner(id: number | string): groupStruct | undefined;

    findAll(): groupStruct[];
}