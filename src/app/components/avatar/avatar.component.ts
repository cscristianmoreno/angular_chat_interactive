import { Component, Input } from "@angular/core";

@Component({
    selector: "app-avatar",
    templateUrl: "./avatar.component.html",
    styleUrls: [
        "./avatar.component.css",
        "../../../assets/css/sizes.css"
    ]
})

export class AvatarComponent {
    
    @Input()
    avatar?: string;
    
    @Input()
    size: string = "sm";

    @Input()
    border!: string;
}