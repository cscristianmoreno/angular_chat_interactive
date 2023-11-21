import { Injectable } from "@angular/core";
import { groupStruct } from "../models/group.model";
import { GroupRepository } from "../repository/group.repository";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class GroupsDTO implements GroupRepository {
    group: BehaviorSubject<groupStruct[]> = new BehaviorSubject<groupStruct[]>([]);
    readonly group$: Observable<groupStruct[]> = this.group.asObservable();

    create(group: groupStruct): void {
        this.group.next([...this.group.value, group]);
    }

    delete(/*group: groupStruct*/): void {
        throw new Error("Method not implemented.");
    }

    findById(id: number | string): groupStruct | undefined {
        const group: groupStruct[] = [...this.group.value];
        const result: groupStruct | undefined = group.find((group: groupStruct) => group.id === id);
        return result;
    }

    findByOwner(id: number | string): groupStruct | undefined {
        const group: groupStruct[] = [...this.group.value];
        const result: groupStruct | undefined = group.find((group: groupStruct) => group.owner_id === id);
        return result;
    }

    findAll(): groupStruct[] {
        return this.group.value;
    }
    
}