import { BehaviorSubject, Observable } from "rxjs";
import { messageGroupStruct } from "../models/message.group.model";
import { messageGroupRepository } from "../repository/message.group.repository";

export class MessagesGroupDTO implements messageGroupRepository {

    messageGroup: BehaviorSubject<messageGroupStruct[]> = new BehaviorSubject<messageGroupStruct[]>([]);
    readonly messageGroup$: Observable<messageGroupStruct[]> = this.messageGroup.asObservable();

    save(messageGroup: messageGroupStruct): void {
        const msg: messageGroupStruct[] = [...this.messageGroup.value];
        msg.push(messageGroup);
        this.messageGroup.next(msg);
    }

    findAllById(group_id: number): messageGroupStruct[] {
        const msg: messageGroupStruct[] = [...this.messageGroup.value].filter((messageGroup: messageGroupStruct) => messageGroup.id_group === group_id);
        return msg;
    }
}