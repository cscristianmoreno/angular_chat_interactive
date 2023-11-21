import { Injectable } from "@angular/core";

import { contactStruct } from "../models/contact.model";
import { ContactRepository } from "../repository/contact.repository";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ContactsDTO implements ContactRepository {

    contact: BehaviorSubject<contactStruct[]> = new BehaviorSubject<contactStruct[]>([]);
    readonly contact$: Observable<contactStruct[]> = this.contact.asObservable();

    save(contact: contactStruct): void {
        const contacts: contactStruct[] = [...this.contact.value];
        contacts.unshift(contact); 
        this.contact.next(contacts);
    }

    delete(user_id: string | number, contact_id: string | number): void {
        const contacts: contactStruct[] = [...this.contact.value];
        const position: contactStruct[] = contacts.filter((contact: contactStruct) => contact.id1 !== user_id || contact.id2 !== contact_id);
        
        this.contact.next(position);
    }


    findById(id: number | string): contactStruct | undefined {
        const contact: contactStruct[] = [...this.contact.value];
        const find: contactStruct | undefined  = contact.find((contact: contactStruct) => contact.id2 === id);
        return find;
    }

    findAllById(id: number | string): contactStruct[] {
        const contacts: contactStruct[] = [...this.contact.value].filter((contact: contactStruct) => contact.id1 === id);
        return contacts;
    }
}