import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ChatType } from "../enums/chat.enum";

@Injectable({
    providedIn: "root"
})

export class ChatService {
    chatIndex: BehaviorSubject<number | string | null> = new BehaviorSubject<number | string | null>(null);
    readonly chatIndex$: Observable<number | string | null> = this.chatIndex.asObservable();

    chatType: BehaviorSubject<ChatType> = new BehaviorSubject<ChatType>(ChatType.SECTION_CHAT_USER);
    readonly chatType$: Observable<ChatType> = this.chatType.asObservable();

    chatOpenWithFirstMessage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}