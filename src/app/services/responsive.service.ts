import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SectionType } from "../enums/section.enum";

@Injectable({
    providedIn: "root"
})

export class ResponsiveService {
    
    section: BehaviorSubject<SectionType> = new BehaviorSubject<SectionType>(SectionType.SECTION_MENU);
    readonly section$: Observable<number> = this.section.asObservable();
}