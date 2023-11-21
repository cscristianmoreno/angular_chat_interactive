import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, ViewChild } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";
import { messageStruct } from "src/app/models/message.model";
import { userStruct } from "src/app/models/user.model";
import { DateService } from "src/app/services/date.service";
import { IconService } from "src/app/services/icon.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-message",
    templateUrl: "./message.component.html",
    styleUrls: [
        "./message.component.css"
    ]
})

export class MessageComponent implements AfterViewInit {
    
    @Input()
    message!: messageStruct;

    @Input()
    avatar!: string;

    protected iconCheck!: SafeHtml;

    @ViewChild("messageRef")
    private messageRef!: ElementRef;

    protected user!: userStruct;

    constructor(private renderer2: Renderer2, private userService: UserService, private iconService: IconService, 
        private changeDetectornRef: ChangeDetectorRef, private dateService: DateService) {
        this.user = this.userService.user;
    }

    public async ngAfterViewInit(): Promise<void> {
        this.iconCheck = await this.iconService.getIcon("check.svg"); 

        if (this.message.id_send === this.userService.user.id) {
            this.renderer2.setStyle(this.messageRef.nativeElement, "flex-direction", "row-reverse");
        }

        this.changeDetectornRef.detectChanges();
    }

    public messageDate(unixtime: number): string {
        return this.dateService.unixToTimeString(unixtime);
    }
}