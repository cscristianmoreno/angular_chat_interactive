import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class SearchService {
    search: BehaviorSubject<string> = new BehaviorSubject<string>("");
    readonly search$: Observable<string> = this.search.asObservable();
}