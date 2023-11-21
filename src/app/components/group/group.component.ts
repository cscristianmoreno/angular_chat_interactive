import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core";
import { GroupsDTO } from "src/app/dto/groups.dto";
import { MembersDTO } from "src/app/dto/members.dto";
import { UsersDTO } from "src/app/dto/users.dto";
import { groupStruct } from "src/app/models/group.model";
import { memberStruct } from "src/app/models/member.model";
import { userStruct } from "src/app/models/user.model";
import { EffectService } from "src/app/services/effect.service";
import { SearchService } from "src/app/services/search.service";
import { UserService } from "src/app/services/user.service";
import searchUtil from "src/app/utils/search.util";

@Component({
    selector: "app-group",
    templateUrl: "./group.component.html",
    styleUrls: [
        "./group.component.css",
        "../../../assets/css/menu_items.css"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class GroupComponent implements OnInit, AfterViewInit {

    protected groups: groupStruct[] = [];
    protected groupsAux: groupStruct[] = [];
    
    @ViewChildren("groupsRef")
    private groupsRef!: QueryList<ElementRef>;

    constructor(private groupsDTO: GroupsDTO, private membersDTO: MembersDTO, private userService: UserService, 
        private usersDTO: UsersDTO, private changeDetectorRef: ChangeDetectorRef, private searchService: SearchService, 
        private effectService: EffectService) {
    }

    ngOnInit(): void { 
        this.groupsDTO.group$.subscribe((groups: groupStruct[]) => {
            this.groupsAux = [];

            groups.forEach((str: groupStruct) => {
                this.groupsAux.unshift(str);
            });

            if (!this.searchService.search.value) {
                this.groups = this.groupsAux;
            }

            this.changeDetectorRef.detectChanges();
        });
        
        this.membersDTO.member$.subscribe(() => {
            this.changeDetectorRef.detectChanges();
        });

        this.searchService.search$.subscribe((res: string) => {
            this.groups = searchUtil<groupStruct>(this.groupsAux, "name", res);
            this.changeDetectorRef.detectChanges();
        });
    }

    ngAfterViewInit(): void {
        this.groupsRef.changes.subscribe(() => {
            this.effectService.createEffect(this.groupsRef, 0);
            this.changeDetectorRef.detectChanges();
        });

    }

    public findMembers(id: number): userStruct[] {
        
        const members: memberStruct[] = this.membersDTO.findAllByGroupId(id);

        const list: userStruct[] = [];

        for (const member of members) {
           const user: userStruct | undefined = this.usersDTO.findById(member.user_id);

            if (!user) {
                continue;
            }

            if (list.length >= 5) {
                break;
            }
            
            list.push(user);
        }

        return list;
    }

    public joinGroup(id: number): void {
        if (this.isMember(id)) {
            return;
        }

        const member: memberStruct = {
            user_id: this.userService.user.id,
            group_id: id,
            date: new Date().toLocaleTimeString()
        };

        this.membersDTO.save(member);
    }

    public isMember(id: number): boolean {
        const members: memberStruct[] = this.membersDTO.findAllByGroupId(id);
        const find: memberStruct | undefined  = members.find((member: memberStruct) => member.user_id === this.userService.user.id);
        return (find) ? true : false;
    }
}