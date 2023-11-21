import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class DateService {

    public unixToTimeString(date: number): string {
        const newDate: string = new Date(date).toLocaleTimeString("it-IT", {
            timeStyle: "short"
        }); 

        return newDate;
    }

    public unixToGetTimeBySecond(date: number): string {

        const timestamp: number = ((Date.now() - date) / 1000);

        const hours: number = Math.floor((timestamp / 3600) % 24);
        const minutes: number = Math.floor((timestamp / 60) % 60);
        const seconds: number = Math.floor((timestamp % 60));

        if (hours) {
            return `Hace ${hours} hora${(hours !== 1) ? "s" : ""} y ${minutes} minuto${(minutes) ? "s" : ""}`;
        }
        else if (minutes) {   
            return `Hace ${minutes} minuto${(minutes !== 1) ? "s" : ""}`;
        }
        else {
            if (seconds <= 10) {
                return "Hace un instante";
            }

            return `Hace ${seconds} segundos`;
        }
    }
}