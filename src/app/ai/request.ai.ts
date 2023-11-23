import { Injectable } from "@angular/core";
import { userStruct } from "../models/user.model";
import { UsersDTO } from "../dto/users.dto";
import { RequestsDTO } from "../dto/requests.dto";
import { UserService } from "../services/user.service";
import { requestStruct } from "../models/request.model";
import { NotificationsDTO } from "../dto/notifications.dto";
import { notificationStruct } from "../models/notification.model";
import { contactStruct } from "../models/contact.model";
import { ContactsDTO } from "../dto/contacts.dto";

@Injectable({
    providedIn: "root"
})

export class RequestAI {
    
    constructor(private usersDTO: UsersDTO, private requestsDTO: RequestsDTO, private userService: UserService, 
        private notificationsDTO: NotificationsDTO, private contactsDTO: ContactsDTO) {
        
    }

    public generateRandomFriend(): void {
        
        const users: userStruct[] = this.usersDTO.findAll();
        const random: number = Math.floor(Math.random() * users.length);
        
        if (users[random].id === this.userService.user.id) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/init-declarations
        let exists: requestStruct | contactStruct | undefined;
        // eslint-disable-next-line prefer-const
        exists = this.requestsDTO.findById(this.userService.user.id, users[random].id);

        if (exists) {
            return;
        }

        const contacts: contactStruct[] = this.contactsDTO.findAllById(this.userService.user.id);
        exists = contacts.find((contact: contactStruct) => contact.id2 === users[random].id);

        if (exists) {
            return;
        }

        const request: requestStruct = {
            id_received: 1,
            id_sender: users[random].id,
            date: Date.now()
        };
        
        
        const notification: notificationStruct = {
            avatar: users[random].picture.medium,
            name: `${users[random].name.first} ${users[random].name.last}`,
            description: "te envió una solicitud de amistad",
            date: Date.now()
        };

        this.requestsDTO.save(request);
        this.notificationsDTO.create(notification);
    }
}