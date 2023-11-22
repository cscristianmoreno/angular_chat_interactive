import { Injectable } from "@angular/core";
import { GroupsDTO } from "src/app/dto/groups.dto";
import { MembersDTO } from "src/app/dto/members.dto";
import { UsersDTO } from "src/app/dto/users.dto";
import { groupStruct } from "src/app/models/group.model";
import { userStruct } from "src/app/models/user.model";
import { memberStruct } from "../models/member.model";
import { messageGroupStruct } from "../models/message.group.model";
import USERS_MESSAGES from "../mock/message.mock";
import { MessagesGroupDTO } from "../dto/messages.groups.dto";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: "root"
})

export class MessageGroupAI {

    constructor(private usersDTO: UsersDTO, private groupsDTO: GroupsDTO, private membersDTO: MembersDTO, 
                private messagesGroupDTO: MessagesGroupDTO, private userService: UserService) {

    }

    public generateRandomMessageGroup(): void {
        const users: userStruct[] = this.usersDTO.findAll();
        
        const random: number = Math.floor(Math.random() * users.length);
        const member: memberStruct | undefined = this.membersDTO.findById(users[random].id);

        if (!member) {
            return;
        } 

        if (member.user_id === this.userService.user.id) {
            return;
        }

        const group: groupStruct | undefined = this.groupsDTO.findById(member.group_id);

        if (!group) {
            return;
        }

        const randomMessage: number = Math.floor(Math.random() * USERS_MESSAGES.length);
        const message: string = USERS_MESSAGES[randomMessage];

        const groupMessage: messageGroupStruct = {
            id_group: group.id,
            id_send: member.user_id,
            message: message,
            date: Date.now()
        };

        this.messagesGroupDTO.save(groupMessage);
    }
}