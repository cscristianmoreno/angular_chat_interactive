import { Component, Input } from "@angular/core";
import { userStruct } from "src/app/models/user.model";

@Component({
    selector: "app-chat-profile",
    templateUrl: "./chat.profile.component.html",
    styleUrls: [
        "./chat.profile.component.css"
    ]
})

export class ChatProfileComponent {
    
    @Input()
    profile!: userStruct | null;
}