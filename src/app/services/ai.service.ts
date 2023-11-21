import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { GroupAI } from "../ai/group.ai";
import { MessageAI } from "../ai/message.ai";
import { MemberAI } from "../ai/member.ai";
import { RequestAI } from "../ai/request.ai";
import { RegisterAI } from "../ai/register.ai";

@Injectable()
export class AiService {
    
    constructor(private http: HttpService, private groupAI: GroupAI, private messageAI: MessageAI, private memberAI: MemberAI,
        private requestAI: RequestAI, private registerAI: RegisterAI) {
        
    }

    public async createUsers(): Promise<void> {
        await this.http.createUsers(20);
    }

    public async aiStart(): Promise<void> {

        const random: number = Math.floor(Math.random() * 6);

        switch(random) {
            case 0: {
                this.groupAI.generateRandomGroup();
                break;
            }
            case 1: {
                this.memberAI.generateRandomMember();
                break;
            }
            case 2: {
                this.requestAI.generateRandomFriend();
                break;
            }
            case 3: {
                await this.registerAI.generateRandomUser();
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