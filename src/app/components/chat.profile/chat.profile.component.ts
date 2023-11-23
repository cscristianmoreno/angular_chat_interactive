import { Component, Input } from "@angular/core";
import { MembersDTO } from "src/app/dto/members.dto";
import { ChatType } from "src/app/enums/chat.enum";
import { groupStruct } from "src/app/models/group.model";
import { userStruct } from "src/app/models/user.model";

@Component({
    selector: "app-chat-profile",
    templateUrl: "./chat.profile.component.html",
    styleUrls: [
        "./chat.profile.component.css"
    ]
})

export class ChatProfileComponent {
    
    protected name!: string;
    protected avatar!: string;
    protected group_members!: number;
    protected group_max_members!: number;

    constructor(private membersDTO: MembersDTO) {

    }

    @Input()
    type!: ChatType;

    @Input()
    set profile(data: userStruct | groupStruct | undefined) {
        if (!data) {
            return;
        }

        if ("fullname" in data) {
            this.name = data.fullname;
            this.avatar = data.picture.large;
        }
        else {
            this.name = data.name;
            this.group_members = this.membersDTO.findAllByGroupId(data.id).length;
            this.group_max_members = data.max_members;
        }
    }
}