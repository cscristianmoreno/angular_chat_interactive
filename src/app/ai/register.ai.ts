import { Injectable } from "@angular/core";
import { HttpService } from "../services/http.service";

@Injectable({
    providedIn: "root"
})

export class RegisterAI {

    constructor(private httpService: HttpService) {

    }

    public async generateRandomUser(): Promise<void> {
        await this.httpService.createUsers(1);
    }
}