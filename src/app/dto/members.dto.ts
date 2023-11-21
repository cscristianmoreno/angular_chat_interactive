import { BehaviorSubject, Observable } from "rxjs";
import { memberStruct } from "../models/member.model";
import { MemberRepository } from "../repository/member.repository";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class MembersDTO implements MemberRepository {

    member: BehaviorSubject<memberStruct[]> = new BehaviorSubject<memberStruct[]>([]);
    readonly member$: Observable<memberStruct[]> = this.member.asObservable();

    save(member: memberStruct): void {
        this.member.next([...this.member.value, member]);
    }
    
    leave(/*member: memberStruct*/): void {
        throw new Error("Method not implemented.");
    }

    findById(id: number | string): memberStruct | undefined {
        const members: memberStruct[] = [...this.member.value];
        const find: memberStruct | undefined = members.find((member: memberStruct) => member.user_id === id);
        return find;
    }

    findAllByGroupId(group_id: string | number): memberStruct[] {
        const members: memberStruct[] = [...this.member.value];
        const find: memberStruct[]  = members.filter((member: memberStruct) => member.group_id === group_id);
        return find;    
    }

    findAllById(id: string | number): memberStruct[] {
        const members: memberStruct[] = [...this.member.value];
        const find: memberStruct[]  = members.filter((member: memberStruct) => member.user_id === id);
        return find;    
    }
}