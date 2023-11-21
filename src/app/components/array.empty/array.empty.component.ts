import { Component, Input } from "@angular/core";

@Component({
    selector: "app-array-empty",
    templateUrl: "./array.empty.component.html",
    styleUrls: [
        "./array.empty.component.css"
    ]
})

export class ArrayEmptyComponent {
    
    @Input()
    array!: unknown[];
}