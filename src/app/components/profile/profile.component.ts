/* eslint-disable prefer-const */
import { Component, Input } from "@angular/core";
import { GroupsDTO } from "src/app/dto/groups.dto";
import { MembersDTO } from "src/app/dto/members.dto";
import { UsersDTO } from "src/app/dto/users.dto";
import { ChatType } from "src/app/enums/chat.enum";
import { SectionType } from "src/app/enums/section.enum";
import { groupStruct } from "src/app/models/group.model";
import { memberStruct } from "src/app/models/member.model";
import { userStruct } from "src/app/models/user.model";
import { DateService } from "src/app/services/date.service";
import { ResponsiveService } from "src/app/services/responsive.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: [
        "./profile.component.css"
    ]
})

export class ProfileComponent {
    
    @Input()
    user!: userStruct;

    @Input()
    responsive!: boolean;

    @Input()
    chatType!: ChatType;

    constructor(private dateService: DateService, private responsiveService: ResponsiveService, private groupsDTO: GroupsDTO,
        private membersDTO: MembersDTO, private usersDTO: UsersDTO) {

    }

    public getTime(date: number): string {
        return this.dateService.unixToGetTimeBySecond(date);
    }

    public onClickMoveToChat(): void {
        this.responsiveService.section.next(SectionType.SECTION_CHAT);
    }

    public findAllGroups(): string[] {
        const member: memberStruct[] = this.membersDTO.findAllById(this.user.id);

        if (!member.length) {
            return [];
        }

        let groups: string[] = [];

        member.forEach((member: memberStruct) => {

            const group: groupStruct | undefined  = this.groupsDTO.findById(member.group_id);

            if (!group) {
                return;
            }

            const owner: userStruct | undefined = this.usersDTO.findById(group.owner_id);

            if (!owner) {
                return;
            }

            groups.push(group.name);
        });

        return groups;
    }
}