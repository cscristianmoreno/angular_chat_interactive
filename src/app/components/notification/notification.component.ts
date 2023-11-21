
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from "@angular/core";
import { NotificationsDTO } from "src/app/dto/notifications.dto";
import { notificationStruct } from "src/app/models/notification.model";
import { DateService } from "src/app/services/date.service";
import { EffectService } from "src/app/services/effect.service";

@Component({
    selector: "app-notification",
    templateUrl: "./notification.component.html",
    styleUrls: [
        "./notification.component.css"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationComponent implements OnInit, AfterViewInit {

    protected notifications!: notificationStruct[];

    @ViewChildren("elementRef")
    private elementRef!: QueryList<ElementRef>;

    constructor(private notificationsDTO: NotificationsDTO, private effectService: EffectService, 
        private renderer2: Renderer2, private dateService: DateService, private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.notificationsDTO.notification$.subscribe((res: notificationStruct[]) => {
            this.notifications = res;

            this.changeDetectorRef.detectChanges();
        });
    }

    ngAfterViewInit(): void {
        this.elementRef.changes.subscribe(() => {
            this.effectService.createEffect(this.elementRef, 0);
        });
    }

    public getTime(date: number): string {
        return this.dateService.unixToGetTimeBySecond(date);
    }
}