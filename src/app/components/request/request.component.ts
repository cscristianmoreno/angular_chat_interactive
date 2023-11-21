import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ContactsDTO } from "src/app/dto/contacts.dto";
import { RequestsDTO } from "src/app/dto/requests.dto";
import { UsersDTO } from "src/app/dto/users.dto";
import { contactStruct } from "src/app/models/contact.model";
import { requestStruct } from "src/app/models/request.model";
import { userStruct } from "src/app/models/user.model";
import { EffectService } from "src/app/services/effect.service";
import { SearchService } from "src/app/services/search.service";
import { UserService } from "src/app/services/user.service";
import searchUtil from "src/app/utils/search.util";

@Component({
    selector: "app-request",
    templateUrl: "./request.component.html",
    styleUrls: [
        "./request.component.css",
        "../../../assets/css/menu_items.css"
    ]
})

export class RequestComponent implements OnInit, AfterViewInit {
    
    protected users: userStruct[] = [];
    protected usersAux: userStruct[] = [];

    @ViewChildren("elementUsersRef")
    private elementUsersRef!: QueryList<ElementRef>;

    private elementEffectPosition: number = 0;

    constructor(private userService: UserService, private requestsDTO: RequestsDTO, private effectService: EffectService, 
        private usersDTO: UsersDTO, private contactsDTO: ContactsDTO, private searchService: SearchService) {
        
    }

    ngOnInit(): void {
        this.requestsDTO.request$.subscribe((res: requestStruct[]) => {
            this.usersAux = [];
            
            res.forEach((str: requestStruct) => {  
                if (str.id_received !== this.userService.user.id) {
                    return;
                }

                const find: userStruct | undefined = this.usersDTO.findById(str.id_sender);
    
                if (!find) {
                    return;
                }

                this.usersAux.unshift(find);
            });

            if (!this.searchService.search.value) {
                this.users = this.usersAux;
            }
        });

        this.searchService.search$.subscribe((res: string) => {
            if (!res) {
                if (!res.length) {
                    this.users = this.usersAux;
                    return;
                }
            }

            this.users = searchUtil(this.usersAux, "fullname", res);
        });
    }

    ngAfterViewInit(): void {
        this.elementUsersRef.changes.subscribe(async () => {
            if (this.elementEffectPosition !== -1) {
                this.elementEffectPosition = -1;
                return;
            }

            this.effectService.createEffect(this.elementUsersRef, 0);
        });
    }

    public async addContact(id: number | string, position: number): Promise<void> {
        
        const contact: contactStruct = {
            id1: this.userService.user.id,
            id2: id,
            date: Date.now()
        };
        
        this.contactsDTO.save(contact);

        const request: requestStruct = {
            id_sender: id,
            id_received: this.userService.user.id,
            date: Date.now()
        };

        
        await this.effectService.createEffect(this.elementUsersRef, position);
        
        this.users.splice(position, 1);
        this.requestsDTO.delete(request);
        this.elementEffectPosition = position;
    }
    
    public deleteRequest(id: number | string, position: number): void {

        const request: requestStruct = {
            id_sender: id,
            id_received: this.userService.user.id,
            date: Date.now()
        };
        
        
        this.users.splice(position, 1);
        this.requestsDTO.delete(request);
        this.elementEffectPosition = position;
    }
}