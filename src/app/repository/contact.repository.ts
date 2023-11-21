import { contactStruct } from "../models/contact.model";

export declare interface ContactRepository {
    save(contact: contactStruct): void;

    delete(user_id: number | string, contact_id: number | string): void;

    findById(id: number | string): contactStruct | undefined;

    findAllById(id: number | string): contactStruct[];
}