import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { ContactsDTO } from "src/app/dto/contacts.dto";
import { GroupsDTO } from "src/app/dto/groups.dto";
import { MessagesDTO } from "src/app/dto/messages.dto";
import { RequestsDTO } from "src/app/dto/requests.dto";
import { contactStruct } from "src/app/models/contact.model";
import { groupStruct } from "src/app/models/group.model";
import { messageStruct } from "src/app/models/message.model";
import { requestStruct } from "src/app/models/request.model";
import { SearchService } from "src/app/services/search.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: [
        "./search.component.css"
    ]
})

export class SearchComponent implements OnInit {
    
    
    protected chats: number = 0;
    protected groups: number = 0;
    protected contacts: number = 0;
    protected requests: number = 0;

    @Output()
    private channelEventEmitter: EventEmitter<number> = new EventEmitter<number>();
    
    @ViewChild("idSearch")
    private idSearch!: ElementRef;

    constructor(private userService: UserService, private groupsDTO: GroupsDTO, private messagesDTO: MessagesDTO, 
        private requestsDTO: RequestsDTO, private searchService: SearchService, private contactsDTO: ContactsDTO) {

    }

    protected channel: number = 0;

    ngOnInit(): void {
        this.channelEventEmitter.subscribe((res: number) => {
            this.channel = res;
            
            switch(this.channel) {
                case 0: {
                    this.chats = 0;
                    break;
                }
                case 1: {
                    this.groups = 0;
                    break;
                }
                case 2: {
                    this.contacts = 0;
                    break;
                }
                case 3: {
                    this.requests = 0;
                    break;
                }
            }
        });

        this.messagesDTO.message$.subscribe((res: messageStruct[]) => {
            if (this.channel === 0) {
                return;
            }

            if (res[res.length - 1].id_received !== this.userService.user.id) {
                return;
            }


             this.chats++;
        });

        this.groupsDTO.group$.subscribe((res: groupStruct[]) => {
            if (res.length === 0) {
                return;
            }

            if (this.channel === 1) {
                return;
            }

            this.groups++; 
        });

        this.contactsDTO.contact$.subscribe((res: contactStruct[]) => {
            if (res.length === 0) {
                return;
            }

            if (this.channel === 2) {
                return;
            }

            this.contacts++;
        });

        this.requestsDTO.request$.subscribe((res: requestStruct[]) => {
            if (res.length === 0) {
                return;
            }

            if (this.channel === 3) {
                return;
            }

            this.requests++;
        });
    }

    public setChannelEventEmitter(channel: number): void {
        this.channelEventEmitter.emit(channel);
    }

    public onKeyUpEvent(): void {
        const search: string = this.idSearch.nativeElement.value.trim();
        this.searchService.search.next(search.toLowerCase());
    }
}