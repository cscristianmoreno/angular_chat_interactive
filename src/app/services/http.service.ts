import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, lastValueFrom } from "rxjs";
import { UsersDTO } from "../dto/users.dto";
import { userStruct } from "../models/user.model";
import { fetchStruct } from "../models/fetch.model";
import JOBS from "../mock/job.group";
import { notificationStruct } from "../models/notification.model";
import { NotificationsDTO } from "../dto/notifications.dto";

@Injectable({
    providedIn: "root"
})

export class HttpService {

    constructor(private http: HttpClient, private usersDTO: UsersDTO, private notificationsDTO: NotificationsDTO) {

    }

    public async createUsers(max: number): Promise<void> {
        const MAX_USERS: number = max;

        const request: Observable<fetchStruct> = this.http.get<fetchStruct>(`https://randomuser.me/api/?results=${MAX_USERS}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        
        const result: fetchStruct = await lastValueFrom(request);
        
        const { results } = result;

        results.forEach((str: userStruct) => {
            const exists: userStruct | undefined = this.usersDTO.findByUsername(str.login.username);

            if (exists) {
                return;
            }

            const id: number = this.usersDTO.findAll().length;

            const rand_job: number = Math.floor(Math.random() * JOBS.length);
            const job: string = JOBS[rand_job]; 
            str.id = (id + 1);
            str.job = job;
            str.date = Date.now();
            str.fullname = str.name.first + " " + str.name.last;
            
            this.usersDTO.save(str);

            const notification: notificationStruct = {
                avatar: str.picture.medium,
                name: str.name.first + " " + str.name.last,
                description: `se ha registrado, usuario número #${str.id}`,
                date: Date.now()
            };

            this.notificationsDTO.create(notification);
        });
    }

    public async getIcon(icon: string): Promise<string> {
        const request: Observable<string> = this.http.get(`/assets/icons/${icon}`, {
            responseType: "text"
        });
        
        const result: string = await lastValueFrom(request);
        return result;
    }
}