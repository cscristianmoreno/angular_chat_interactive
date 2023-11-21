import { Injectable } from "@angular/core";
import { ContactsDTO } from "src/app/dto/contacts.dto";
import { MessagesDTO } from "src/app/dto/messages.dto";
import { UsersDTO } from "src/app/dto/users.dto";
import USERS_MESSAGES from "src/app/mock/message.mock";
import { messageStruct } from "src/app/models/message.model";
import { userStruct } from "src/app/models/user.model";
import { UserService } from "../services/user.service";
import { MessagesCountDTO } from "../dto/messages.count.dto";
import { messageCountStruct } from "../models/message.count.model";

@Injectable({
    providedIn: "root"
})

export class MessageAI {

    constructor(private usersDTO: UsersDTO, private contactsDTO: ContactsDTO, private messagesDTO: MessagesDTO, 
        private userService: UserService, private messagesCountDTO: MessagesCountDTO) {
    }

    public generateRandomMessage(): void {
        const users: userStruct[] = this.usersDTO.findAll();
        const random: number = Math.floor(Math.random() * users.length) + 1;
        const user: userStruct | undefined = this.usersDTO.findById(random);

        if (user && user.id !== this.userService.user.id) {
            const randomMessage: number = Math.floor(Math.random() * USERS_MESSAGES.length);

            const message: messageStruct = {
                id_send: user.id,
                id_received: 1,
                message: USERS_MESSAGES[randomMessage],
                date: Date.now(),
                readed: false
            };

            const messageCount: messageCountStruct = {
                id_send: user.id,
                id_received: 1,
                date: Date.now()
            };
            
            this.messagesCountDTO.save(messageCount);
            this.messagesDTO.save(message);
        }
    }
}
