import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
import { ContactsDTO } from "src/app/dto/contacts.dto";
import { UsersDTO } from "src/app/dto/users.dto";
import { contactStruct } from "src/app/models/contact.model";
import { userStruct } from "src/app/models/user.model";
import { EffectService } from "src/app/services/effect.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-suggestion",
    templateUrl: "./suggestion.component.html",
    styleUrls: [
        "./suggestion.component.css"
    ]
})

export class SuggestionComponent implements AfterViewInit {
    
    protected users: userStruct[] = [];

    @ViewChildren("userRef")
    private usersRef!: QueryList<ElementRef>;

    private elementEffectPosition!: number;
    
    constructor(private usersDTO: UsersDTO, private effectService: EffectService, private contactsDTO: ContactsDTO, 
        private userService: UserService) {
        
    }
    
    ngAfterViewInit(): void {
        setInterval(() => {
            this.getSuggestions();
        }, 3000);

        this.usersRef.changes.subscribe(() => {
            if (!this.elementEffectPosition) {
                this.effectService.createEffect(this.usersRef, this.usersRef.length - 1);
                return;
            }
            
            this.effectService.createEffect(this.usersRef, this.elementEffectPosition);
        });    
    }

    public getSuggestions(): void {
        const MAX_SUGGESTIONS: number = 5;
        const MAX_USERS: number = this.usersDTO.findAll().length;

        const random: number = Math.floor(Math.random() * MAX_USERS);
        const user: userStruct | undefined = this.usersDTO.findById(random);

        if (user) {  
            if (user.id === this.userService.user.id) {
                return;
            }

            const existInSuggestions: userStruct | undefined = this.users.find((u: userStruct) => u === user);
            const isContact: contactStruct | undefined = this.contactsDTO.findById(user.id);

            if (existInSuggestions) {
                return;
            }

            if (isContact) {
                return;
            }

            if (this.users.length < MAX_SUGGESTIONS && MAX_USERS >= MAX_SUGGESTIONS) {
                this.users.push(user);
            }
            else {
                const rand: number = Math.floor(Math.random() * this.users.length);
                this.elementEffectPosition = rand;
                this.users.splice(rand, 1, user);
            }
        } 
    }

    public addContact(user: userStruct): void {
        const contact: contactStruct = {
            id1: this.userService.user.id,
            id2: user.id,
            date: Date.now()
        };

        this.contactsDTO.save(contact);
    }
}   