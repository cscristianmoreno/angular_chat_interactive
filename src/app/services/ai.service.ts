import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { GroupAI } from "../ai/group.ai";
import { MessageAI } from "../ai/message.ai";
import { MemberAI } from "../ai/member.ai";
import { RequestAI } from "../ai/request.ai";
import { RegisterAI } from "../ai/register.ai";
import { MessageGroupAI } from "../ai/message.group.ai";

@Injectable()
export class AiService {
    
    constructor(private http: HttpService, private groupAI: GroupAI, private messageAI: MessageAI, private memberAI: MemberAI,
        private requestAI: RequestAI, private registerAI: RegisterAI, private messageGroupAI: MessageGroupAI) {
        
    }

    public async createUsers(): Promise<void> {
        await this.http.createUsers(20);
    }

    public async aiStart(): Promise<void> {

        const random: number = Math.floor(Math.random() * 13);

        switch(random) {
            case 0: case 1: {
                this.groupAI.generateRandomGroup();
                break;
            }
            case 2: case 3: case 4: {
                this.memberAI.generateRandomMember();
                break;
            }
            case 6: {
                this.requestAI.generateRandomFriend();
                break;
            }
            case 7: {
                await this.registerAI.generateRandomUser();
                break;
            }
            case 8: case 9: case 10: {
                this.messageGroupAI.generateRandomMessageGroup();
                break;
            }
            default: {
                this.messageAI.generateRandomMessage();
                break;
            }
        }

        const min_millis: number = 100; 
        const max_millis: number = 750;

        const time: number = Math.floor(Math.random() * (max_millis - min_millis) + min_millis);

        setTimeout(() => {
            this.aiStart();
        }, time);
    }
}