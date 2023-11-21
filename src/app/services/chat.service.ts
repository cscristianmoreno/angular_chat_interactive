import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ChatService {
    chatIndex: BehaviorSubject<number | string | null> = new BehaviorSubject<number | string | null>(null);
    readonly chatIndex$: Observable<number | string | null> = this.chatIndex.asObservable();

    chatOpenWithFirstMessage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}