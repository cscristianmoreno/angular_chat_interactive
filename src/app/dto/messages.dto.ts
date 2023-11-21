import { Injectable } from "@angular/core";
import { MessageRepository } from "../repository/message.repository";
import { messageStruct } from "../models/message.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class MessagesDTO implements MessageRepository {

    message: BehaviorSubject<messageStruct[]> = new BehaviorSubject<messageStruct[]>([]);
    readonly message$: Observable<messageStruct[]> = this.message.asObservable();

    save(newMessage: messageStruct): void { 
        const msg: messageStruct[] = [...this.message.value];
        msg.push(newMessage); 
        this.message.next(msg);
    }

    findAllById(id: number | string, id2: number | string): messageStruct[] {
        const messages: messageStruct[] = [...this.message.value].filter((message: messageStruct) => 
        (message.id_send === id || message.id_received === id) && (message.id_send === id2 || message.id_received === id2));
        return messages;
    }

    deleteAllById(id: string | number, id2: number | string): void {
        const messages: messageStruct[] = [...this.message.value];
        const newMessages: messageStruct[] = messages.filter((message: messageStruct) => 
        (message.id_send !== id && message.id_received !== id) || (message.id_send !== id2 && message.id_received !== id2));
        this.message.next(newMessages);
    }
}