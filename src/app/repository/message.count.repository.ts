import { messageCountStruct } from "../models/message.count.model";

export interface MessageCountRepository {
    save(count: messageCountStruct): void;

    findAllById(received: number | string, sender: number | string): messageCountStruct[];

    deleteAllById(received: number | string, sender: number | string): void;
}