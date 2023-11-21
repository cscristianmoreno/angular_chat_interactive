import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from "@angular/core";
import { UsersDTO } from "src/app/dto/users.dto";
import { userStruct } from "src/app/models/user.model";
import { ChatService } from "src/app/services/chat.service";


@Component({
    selector: "app-aside",
    templateUrl: "./aside.component.html",
    styleUrls: [
        "./aside.component.css"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AsideComponent implements OnInit {

    protected user!: userStruct;

    @Input()
    responsive!: boolean;

    constructor(private usersDTO: UsersDTO, private chatService: ChatService, private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.chatService.chatIndex.subscribe((res: number | string | null) => {
            if (!res) {
                return;
            }

            const user: userStruct | undefined = this.usersDTO.findById(this.chatService.chatIndex.value as number);
            
            if (user) {
                this.user = user;
            }
            
            this.changeDetectorRef.detectChanges();
        });

    }
}
