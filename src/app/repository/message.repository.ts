import { messageStruct } from "../models/message.model";

export declare interface MessageRepository {
    save(message: messageStruct): void;

    findAllById(id: number | string, id2: number | string): messageStruct[];

    deleteAllById(id: number | string, id2: number | string): void;
}