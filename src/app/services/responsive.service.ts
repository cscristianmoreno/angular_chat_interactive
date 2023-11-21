import { BehaviorSubject, Observable } from "rxjs";
import { ResponsiveSections } from "../enums/responsive.enum";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class ResponsiveService {
    
    section: BehaviorSubject<number> = new BehaviorSubject<number>(ResponsiveSections.SECTION_MENU);
    readonly section$: Observable<number> = this.section.asObservable();
}