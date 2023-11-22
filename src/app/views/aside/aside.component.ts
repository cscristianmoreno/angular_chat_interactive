import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from "@angular/core";
import { GroupsDTO } from "src/app/dto/groups.dto";
import { UsersDTO } from "src/app/dto/users.dto";
import { ChatType } from "src/app/enums/chat.enum";
import { groupStruct } from "src/app/models/group.model";
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
    protected chatType!: ChatType;

    @Input()
    responsive!: boolean;

    constructor(private usersDTO: UsersDTO, private chatService: ChatService, private changeDetectorRef: ChangeDetectorRef,
        private groupsDTO: GroupsDTO) {
    }

    ngOnInit(): void {

        this.chatService.chatType$.subscribe((res: ChatType) => {
            this.chatType = res;
        });

        this.chatService.chatIndex.subscribe((res: number | string | null) => {
            if (!res) {
                return;
            }

            // eslint-disable-next-line @typescript-eslint/init-declarations
            let user: userStruct | undefined;

            if (this.chatType === ChatType.SECTION_CHAT_USER) {
                user = this.usersDTO.findById(res as number);
            }
            else {
                const group: groupStruct | undefined = this.groupsDTO.findById(res);
                if (!group) {
                    return;
                }
                
                user = this.usersDTO.findById(group.owner_id);
            }
            
            if (user) {
                this.user = user;
            }

            this.changeDetectorRef.detectChanges();
        });

    }
}
