import { Injectable } from "@angular/core";
import { GroupsDTO } from "src/app/dto/groups.dto";
import { MembersDTO } from "src/app/dto/members.dto";
import { UsersDTO } from "src/app/dto/users.dto";
import { groupStruct } from "src/app/models/group.model";
import { userStruct } from "src/app/models/user.model";
import { NotificationsDTO } from "../dto/notifications.dto";
import { notificationStruct } from "../models/notification.model";
import GROUPS_TITLES from "../mock/group.mock";
import { UserService } from "../services/user.service";
import { memberStruct } from "../models/member.model";

@Injectable({
    providedIn: "root"
})

export class GroupAI {

    constructor(private usersDTO: UsersDTO, private groupsDTO: GroupsDTO, private membersDTO: MembersDTO, 
                private notificationsDTO: NotificationsDTO, private userService: UserService) {

    }

    public generateRandomGroup(): void {
        const users: userStruct[] = this.usersDTO.findAll();

        const random: number = Math.floor(Math.random() * users.length);
        const groups: groupStruct[] = this.groupsDTO.findAll();

        const group_title_id: number = Math.floor(Math.random() * GROUPS_TITLES.length);
        const group_title: string = GROUPS_TITLES[group_title_id];

        if (this.groupsDTO.findByOwner(users[random].id) || users[random].id === this.userService.user.id) {
            return;
        }

        const group_id: number = groups.length + 1;

        const group: groupStruct = {
            id: group_id,
            owner_id: users[random].id,
            name: group_title,
            date: new Date().toLocaleDateString(),
            max_members: 50
        };

        const member: memberStruct = {
            user_id: users[random].id,
            group_id: group_id,
            date: new Date().toLocaleTimeString()
        };

        const notification: notificationStruct = {
            avatar: users[random].picture.medium,
            name: `${users[random].name.first} ${users[random].name.last}`,
            description: `ha creado el grupo ${group_title}.`,
            date: Date.now() 
        };

        this.groupsDTO.create(group);
        this.notificationsDTO.create(notification);
        this.membersDTO.save(member);
    }
}