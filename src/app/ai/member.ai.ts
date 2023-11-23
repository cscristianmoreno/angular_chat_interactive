import { Injectable } from "@angular/core";
import { GroupsDTO } from "../dto/groups.dto";
import { MembersDTO } from "../dto/members.dto";
import { NotificationsDTO } from "../dto/notifications.dto";
import { UsersDTO } from "../dto/users.dto";
import { groupStruct } from "../models/group.model";
import { memberStruct } from "../models/member.model";
import { notificationStruct } from "../models/notification.model";
import { userStruct } from "../models/user.model";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: "root"
})

export class MemberAI {

    constructor(private groupsDTO: GroupsDTO, private usersDTO: UsersDTO, private membersDTO: MembersDTO, 
    private notificationsDTO: NotificationsDTO, private userService: UserService) {

    }

    public generateRandomMember(): void {
        const users: userStruct[] = this.usersDTO.findAll();

        const groups: groupStruct[] = this.groupsDTO.findAll();
        const random: number = Math.floor(Math.random() * users.length);

        const randomGroupId: number = Math.floor(Math.random() * groups.length) + 1;
        const group: groupStruct | undefined = this.groupsDTO.findById(randomGroupId);

        if (!group) {
            return;
        }

        if (users[random].id === this.userService.user.id) {
            return;
        }

        // if (group.max_members === )

        const members_in_group: number = this.membersDTO.findAllByGroupId(group.id).length;

        if (members_in_group === group.max_members) {
            return;
        }
        
        if (users[random].id === group.owner_id) {
            return;
        }
        
        const find_member: memberStruct | undefined = this.membersDTO.findById(users[random].id);

        if (find_member && find_member.group_id === randomGroupId) {
            return;
        }

        const { name } = group;
        // const user: userStruct = users.find((user: userStruct) => user.id === owner_id) as userStruct;

        const member: memberStruct = {
            user_id: users[random].id,
            group_id: randomGroupId,
            date: new Date().toLocaleDateString()
        };

        const notification: notificationStruct = {
            avatar: users[random].picture.medium,
            name: users[random].name.first + users[random].name.last,
            description: `se ha unido al grupo ${name}.`,
            date: Date.now()
        };

        if (!find_member) {
            this.membersDTO.save(member);
            this.notificationsDTO.create(notification);
        }
    }
}