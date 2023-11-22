/* eslint-disable @typescript-eslint/init-declarations */
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ChangeDetectionStrategy, ChangeDetectorRef, Input } from "@angular/core";
import { GroupsDTO } from "src/app/dto/groups.dto";
import { MessagesDTO } from "src/app/dto/messages.dto";
import { MessagesGroupDTO } from "src/app/dto/messages.groups.dto";
import { UsersDTO } from "src/app/dto/users.dto";
import { ChatType } from "src/app/enums/chat.enum";
import { SectionType } from "src/app/enums/section.enum";
import { groupStruct } from "src/app/models/group.model";
import { messageGroupStruct } from "src/app/models/message.group.model";
import { messageStruct } from "src/app/models/message.model";
import { userStruct } from "src/app/models/user.model";
import { ChatService } from "src/app/services/chat.service";
import { EffectService } from "src/app/services/effect.service";
import { ResponsiveService } from "src/app/services/responsive.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-chat",
    templateUrl: "./chat.component.html",
    styleUrls: [
        "./chat.component.css"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChatComponent implements OnInit, AfterViewInit {

    protected messages: messageStruct[] = [];
    protected messagesGroup: messageGroupStruct[] = [];
    protected user: userStruct;

    protected chatIndex!: number | string | null;
    protected chatType: ChatType = ChatType.SECTION_CHAT_USER;
    protected profile!: userStruct | groupStruct;


    @ViewChild("idFieldMessage")
    private idFieldMessage!: ElementRef;

    @ViewChildren("idMessage")
    private idMessage!: QueryList<ElementRef>;
    
    @ViewChild("idMessageContainer")
    private idMessageContainer!: ElementRef;

    @Input()
    responsive!: boolean;

    private firstOpenChat: number = 0;

    constructor(private messagesDTO: MessagesDTO, private messagesGroupDTO: MessagesGroupDTO, private userService: UserService, 
        private usersDTO: UsersDTO, private groupsDTO: GroupsDTO, private chatService: ChatService, private effectService: EffectService, 
        private changeDetectorRef: ChangeDetectorRef, private responsiveService: ResponsiveService) {
        this.user = this.userService.user;
    }

    ngOnInit(): void {
        this.chatService.chatType$.subscribe((res: ChatType) => {
            if (!this.chatIndex) {
                return;
            }

            this.chatType = res;
        });

        this.chatService.chatIndex.subscribe((res: number | string | null) => {
            this.chatIndex = res;
            this.firstOpenChat = 0;

            if (!res) {
                return;
            }

            let profile: userStruct | groupStruct | undefined;
            
            if (this.chatType === ChatType.SECTION_CHAT_USER) {
                
                profile = this.usersDTO.findById(res) as userStruct;
                    
                if (profile) {
                    this.profile = profile;
                }
                
                const messages: messageStruct[] = this.messagesDTO.findAllById(this.user.id, res);
                this.messages = messages;
                this.changeDetectorRef.markForCheck();
            }
            else {
                profile = this.groupsDTO.findById(res) as groupStruct;
                    
                if (profile) {
                    this.profile = profile;
                }

                const messages: messageGroupStruct[] = this.messagesGroupDTO.findAllById(res as number);
                this.messagesGroup = messages;
                this.changeDetectorRef.markForCheck();
            }
        });

        this.messagesDTO.message$.subscribe((res: messageStruct[]) => {
            if (this.chatType !== ChatType.SECTION_CHAT_USER) {
                return;
            }

            if (!this.chatIndex) {
                return;
            }

            const sender: number | string = res[res.length - 1].id_send;
            
            if (this.user.id !== sender) {
                return;
            }

            this.messages.push(res[res.length - 1]);
            this.changeDetectorRef.detectChanges();
        });

        this.messagesGroupDTO.messageGroup$.subscribe((res: messageGroupStruct[]) => {
            if (this.chatType !== ChatType.SECTION_CHAT_GROUP) {
                return;
            }

            if (!this.chatIndex) {
                return;
            }

            const message: messageGroupStruct = res[res.length - 1];

            if (message.id_group !== this.chatIndex) {
                return;
            }

            this.messagesGroup.push(res[res.length - 1]);
            this.changeDetectorRef.detectChanges();
        });
    }

    ngAfterViewInit(): void {
        this.idMessage.changes.subscribe(() => {
            if (!this.firstOpenChat) {

                let messages: number;

                if (this.chatType === ChatType.SECTION_CHAT_USER) {
                    messages = this.messages.length;
                }
                else {
                    messages = this.messagesGroup.length;
                }

                for (let i: number = 0; i < messages; i++) {
                    this.effectService.createEffect(this.idMessage, i);
                }
                
                this.firstOpenChat = 1;
            }
            else {
                this.effectService.createEffect(this.idMessage, this.idMessage.length - 1);
            }

            this.idMessageContainer.nativeElement.scrollTop = this.idMessageContainer.nativeElement.scrollHeight;
            // this.idFieldMessage.nativeElement.focus();
        });
    }
    
    public sendMessage(): void {
        // eslint-disable-next-line prefer-const
        let fieldMessage: string = this.idFieldMessage.nativeElement.value.trim();
        
        if (!fieldMessage.length || !this.chatIndex) {
            return; 
        }
        
        this.idFieldMessage.nativeElement.value = "";
        
        if (this.chatType === ChatType.SECTION_CHAT_USER) {

            const message: messageStruct = {
                id_send: this.user.id,
                id_received: this.chatIndex,
                message: fieldMessage,
                date: Date.now(),
                readed: false
            };

            this.messagesDTO.save(message);
        }   
        else {
            const message: messageGroupStruct = {
                id_group: this.chatIndex as number,
                id_send: this.user.id,
                message: fieldMessage,
                date: Date.now()
            };

            this.messagesGroupDTO.save(message);
        }
    }

    public onKeyPress(event: KeyboardEvent): void {
        if (event.key !== "Enter") {
            return;
        }

        if (event.shiftKey) {
            return;
        }

        this.sendMessage();
        event.preventDefault();
    }

    public findAvatar(id: number | string): string {
        const user: userStruct | undefined = this.usersDTO.findById(id);
        return (user) ? user.picture.medium : "";
    }

    public onClickArrowBack(): void {
        if (!this.responsive) {
            return;
        }

        this.responsiveService.section.next(SectionType.SECTION_MENU);
    }

    public onClickArrowForward(): void {
        if (!this.responsive) {
            return;
        }

        this.responsiveService.section.next(SectionType.SECTION_ASIDE);
    }
}