import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChildren, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";
import { MessagesDTO } from "src/app/dto/messages.dto";
import { UsersDTO } from "src/app/dto/users.dto";
import { messageStruct } from "src/app/models/message.model";
import { userStruct } from "src/app/models/user.model";
import { ChatService } from "src/app/services/chat.service";
import { EffectService } from "src/app/services/effect.service";
import { IconService } from "src/app/services/icon.service";
import { DateService } from "src/app/services/date.service";
import { UserService } from "src/app/services/user.service";
import { MessagesCountDTO } from "src/app/dto/messages.count.dto";
import { messageCountStruct } from "src/app/models/message.count.model";
import { SearchService } from "src/app/services/search.service";
import searchUtil from "src/app/utils/search.util";

@Component({
    selector: "app-chat-menu",
    templateUrl: "./chat.menu.component.html",
    styleUrls: [
        "./chat.menu.component.css",
        "../../../assets/css/menu_items.css"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChatMenuComponent implements OnInit, AfterViewInit {

    protected users: userStruct[] = [];
    protected usersAux: userStruct[] = [];
    protected user!: userStruct;
    protected iconCheck!: SafeHtml;

    @Input()
    chatIndex!: number | string;

    @ViewChildren("elementRef")
    protected elementRef!: QueryList<ElementRef>;

    constructor(private messagesDTO: MessagesDTO, private userService: UserService, private effectService: EffectService,
        private iconService: IconService, private changeDetectorRef: ChangeDetectorRef, private usersDTO: UsersDTO, 
        private chatService: ChatService, private dateService: DateService, private messagesCountDTO: MessagesCountDTO, 
        private searchService: SearchService) {
            this.user = this.userService.user;
    }

    public async ngOnInit(): Promise<void> {
        this.messagesDTO.message$.subscribe(async (res: messageStruct[]) => {
            if (!res.length) {
                return;
            }

            res.forEach((message: messageStruct) => {
                if (message.id_received !== this.userService.user.id && message.id_send !== this.userService.user.id) {
                    return;
                }
                
                // eslint-disable-next-line @typescript-eslint/init-declarations
                let existUserInChat: userStruct | undefined;
                
                if (message.id_send === this.userService.user.id) {
                    existUserInChat = this.usersAux.find((user: userStruct) => user.id === message.id_received); 

                    if (!existUserInChat) {
                        this.updateChatUser(message.id_received);
                        return;
                    }
                }
                else {
                    existUserInChat = this.usersAux.find((user: userStruct) => user.id === message.id_send);

                    if (!existUserInChat) {
                        this.updateChatUser(message.id_send);
                        return;
                    }
                }

                this.updateChatPosition(existUserInChat.id);
                
            });

            if (this.chatService.chatOpenWithFirstMessage && !this.chatService.chatIndex.value) {
                this.chatService.chatIndex.next(res[res.length - 1].id_send);
            }

            if (!this.searchService.search.value) {
                this.users = this.usersAux;
            }
            
            this.changeDetectorRef.detectChanges();
        });    

        this.searchService.search$.subscribe((res: string) => {
            this.users = searchUtil<userStruct>(this.usersAux, "fullname", res);
            this.changeDetectorRef.detectChanges();
        });

        this.iconCheck = await this.iconService.getIcon("check.svg");
        this.changeDetectorRef.detectChanges();
    }

    ngAfterViewInit(): void {
        this.chatService.chatIndex.subscribe((res: number | string | null) => {
            if (res === null) {
                return;
            }

            this.messagesCountDTO.deleteAllById(this.userService.user.id, res);
            this.chatIndex = res;
        });

        this.elementRef.changes.subscribe(() => {
            this.effectService.createEffect(this.elementRef, 0);
        });
    }

    public selectChat(num: number): void {
        const id2: number | string = this.users[num].id;
        this.chatService.chatIndex.next(id2);
    }

    public lastMessage(id: number | string): string { 
        const messages: messageStruct[] = this.messagesDTO.findAllById(this.userService.user.id, id);
        return messages[messages.length - 1].message;
    }

    public checkIconMessage(id: number | string): boolean {
        const messages: messageStruct[] = this.messagesDTO.findAllById(this.userService.user.id, id);
        return (messages[messages.length - 1].id_send === this.userService.user.id) ? true : false;
    }

    public messageDate(id: number | string): string {
        const messages: messageStruct[] = this.messagesDTO.findAllById(this.userService.user.id, id);
        const date: string = this.dateService.unixToTimeString(messages[messages.length - 1].date);
        return date;
    }

    public messageCount(id: number | string): number {
        const count: messageCountStruct[] = this.messagesCountDTO.findAllById(this.userService.user.id, id);
        return count.length;
    }

    public updateChatUser(id: number | string): void {
        const userSendMessage: userStruct | undefined = this.usersDTO.findById(id);

        if (!userSendMessage) {
            return;
        }
        
        this.usersAux.unshift(userSendMessage);
    }

    public updateChatPosition(id: number | string): void {
        const position: number = this.usersAux.findIndex((user: userStruct) => user.id === id);
        const user: userStruct = this.usersAux[position];

        this.usersAux.splice(position, 1);            
        this.usersAux.unshift(user);
    }
}