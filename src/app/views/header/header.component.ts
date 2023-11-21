
import { Component, OnInit } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";
import { NotificationsDTO } from "src/app/dto/notifications.dto";
import { IconService } from "src/app/services/icon.service";


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: [
        "./header.component.css"
    ]
})

export class HeaderComponent implements OnInit {

    protected notifications: number = 0;
    protected menuNotifications: boolean = false;
    protected menuSuggestions: boolean = false;

    protected icon!: SafeHtml;

    constructor(private notificationsDTO: NotificationsDTO, private iconService: IconService) {
    }

    async ngOnInit(): Promise<void> {
        
        this.icon = await this.iconService.getIcon("logo.svg");

        this.notificationsDTO.notification$.subscribe(() => {
            if (this.menuNotifications) {
                return;
            }

            this.notifications++;
        });
    }

    public openNotifications(): void {
        this.notifications = 0;
        this.menuNotifications = !(this.menuNotifications);
    }

    public openSuggestions(): void {
        this.menuSuggestions = !(this.menuSuggestions);
    }
}
