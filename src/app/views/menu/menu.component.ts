import { Component, EventEmitter, Output } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";
import { groupStruct } from "src/app/models/group.model";
import { userStruct } from "src/app/models/user.model";
import { ChatService } from "src/app/services/chat.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: [
        "./menu.component.css"
    ]
})

export class MenuComponent {
    protected user: userStruct; 

    protected groups!: groupStruct[];

    protected iconCheck!: SafeHtml;

    protected channel: number = 0;
    
    @Output()
    chatItemEventEmitter: EventEmitter<number | string> = new EventEmitter<number | string>();

    constructor(private userService: UserService, private chatService: ChatService) {
        this.user = this.userService.user;
    }

    public channelEventEmitter($event: number): void {
        this.channel = $event;
    }
}