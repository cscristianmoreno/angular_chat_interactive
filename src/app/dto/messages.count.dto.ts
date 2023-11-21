import { BehaviorSubject, Observable } from "rxjs";
import { messageCountStruct } from "../models/message.count.model";
import { MessageCountRepository } from "../repository/message.count.repository";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class MessagesCountDTO implements MessageCountRepository {

    count: BehaviorSubject<messageCountStruct[]> = new BehaviorSubject<messageCountStruct[]>([]);
    count$: Observable<messageCountStruct[]> = this.count.asObservable();

    save(count: messageCountStruct): void {
        const counts: messageCountStruct[] = [...this.count.value];
        counts.push(count);
        this.count.next(counts);
    }

    findAllById(received: number | string, sender: number | string): messageCountStruct[] {
        const counts: messageCountStruct[] = [...this.count.value].filter((count: messageCountStruct) => 
        (count.id_send === sender && count.id_received === received));
        return counts;
    }

    deleteAllById(received: number | string, sender: number | string): void {
        const counts: messageCountStruct[] = [...this.count.value];
        const newCounts: messageCountStruct[] = counts.filter((count: messageCountStruct) => count.id_send !== sender || count.id_received !== received);
        this.count.next(newCounts);
    }

}