import { userStruct } from "../models/user.model";

export declare interface UserRepository {
    save(user: userStruct): void;

    findById(id: number | string): void;
    
    findByUsername(username: string): userStruct | undefined;

    findAll(): userStruct[];
}