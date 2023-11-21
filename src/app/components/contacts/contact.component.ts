import { ChangeDetectorRef, Component, ElementRef, ChangeDetectionStrategy, QueryList, ViewChildren, OnInit, AfterViewInit } from "@angular/core";
import { ContactsDTO } from "src/app/dto/contacts.dto";
import { MessagesDTO } from "src/app/dto/messages.dto";
import { UsersDTO } from "src/app/dto/users.dto";
import { contactStruct } from "src/app/models/contact.model";
import { userStruct } from "src/app/models/user.model";
import { ChatService } from "src/app/services/chat.service";
import { EffectService } from "src/app/services/effect.service";
import { SearchService } from "src/app/services/search.service";
import { UserService } from "src/app/services/user.service";
import searchUtil from "src/app/utils/search.util";

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    styleUrls: [
        "./contact.component.css",
        "../../../assets/css/menu_items.css"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactComponent implements OnInit, AfterViewInit {

    protected users: userStruct[] = [];
    protected usersAux: userStruct[] = [];
    protected chatIndex!: number | string;

    @ViewChildren("usersRef")
    protected usersRef!: QueryList<ElementRef>;

    protected openContactMenuActions: boolean = false;
    protected openContactMenuActionsId: number = -1;
    protected isDelete: boolean = false;

    constructor(private contactsDTO: ContactsDTO, private usersDTO: UsersDTO, 
        private effectService: EffectService, private chatService: ChatService,
        private userService: UserService, private messagesDTO: MessagesDTO, 
        private changeDetectorRef: ChangeDetectorRef, private searchService: SearchService) {
    }

    ngOnInit(): void {
        this.contactsDTO.contact$.subscribe((res: contactStruct[]) => {
            this.usersAux = [];

            res.forEach((contact: contactStruct) => {
                if (contact.id1 !== this.userService.user.id) {
                    return;
                }
                
                const user: userStruct | undefined = this.usersDTO.findById(contact.id2);

                if (!user) {
                    return;
                }

                this.usersAux.push(user);
            });

            if (!this.searchService.search.value) {
                this.users = this.usersAux;
            }

            this.changeDetectorRef.detectChanges();
        });

        this.chatService.chatIndex.subscribe((res: string | number | null) => {
            if (res === null) {
                return;
            }

            this.chatIndex = res;
        });

        this.searchService.search$.subscribe((res: string) => {
            this.openContactMenuActions = false;

            if (!res.length) {
                this.users = this.usersAux;
                this.changeDetectorRef.detectChanges();
                return;
            }


            this.users = searchUtil(this.usersAux, "fullname", res);
            this.changeDetectorRef.detectChanges();
        });
    }

    ngAfterViewInit(): void {
        this.usersRef.changes.subscribe(() => {
            if (this.isDelete) {
                this.isDelete = false;
                return;
            }
            
            this.effectService.createEffect(this.usersRef, 0);
        });
    }

    public selectChat(id: number | string): void {
        if (this.openContactMenuActions) {
            this.openContactMenuActions = false;
            return;
        }

        this.chatService.chatIndex.next(id);
    }

    public openContactSubMenu($event: MouseEvent, num: number): void {
        $event.stopPropagation();

        this.openContactMenuActions = !(this.openContactMenuActions);

        if (this.openContactMenuActionsId !== num) {
            this.openContactMenuActions = true;
        }
        
        this.openContactMenuActionsId = num;
    }

    public async deleteContact(contact: number | string, position: number): Promise<void> {
        this.openContactMenuActionsId = -1;
        this.isDelete = true;
        await this.effectService.createEffect(this.usersRef, position);
        this.users.splice(position, 1);
        this.contactsDTO.delete(this.userService.user.id, contact);
    }

    public clearChat(id: number | string): void {
        this.messagesDTO.deleteAllById(this.userService.user.id, id);
    }
}