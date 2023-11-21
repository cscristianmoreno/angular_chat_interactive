import { Injectable } from "@angular/core";
import { userStruct } from "../models/user.model";
import { UserRepository } from "../repository/user.repository";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class UsersDTO implements UserRepository {
    private users: BehaviorSubject<userStruct[]> = new BehaviorSubject<userStruct[]>([]);
    readonly users$: Observable<userStruct[]> = this.users.asObservable();

    findById(id: number | string): userStruct | undefined {
        const users: userStruct[] = [...this.users.value];
        const find: userStruct | undefined = users.find((user: userStruct) => user.id === id);
        return find;
    }

    findByUsername(username: string): userStruct | undefined {
        const users: userStruct[] = [...this.users.value];
        const find: userStruct | undefined = users.find((user: userStruct) => user.login.username === username);
        return find;
    }

    save(user: userStruct): void {
        this.users.next([...this.users.value, user]);
    }

    findAll(): userStruct[] {
        return [...this.users.value];
    }
}