import { messageGroupStruct } from "../models/message.group.model";

export declare interface messageGroupRepository {
    save(messageGroup: messageGroupStruct): void;

    findAllById(group_id: number): messageGroupStruct[];
}