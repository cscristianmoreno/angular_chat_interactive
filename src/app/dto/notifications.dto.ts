import { Injectable } from "@angular/core";
import { NotificationRepository } from "../repository/notification.repository";
import { notificationStruct } from "../models/notification.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class NotificationsDTO implements NotificationRepository {

    notification: BehaviorSubject<notificationStruct[]> = new BehaviorSubject<notificationStruct[]>([]);
    readonly notification$: Observable<notificationStruct[]> = this.notification.asObservable();

    create(notification: notificationStruct): void {
        const newNotification: notificationStruct[] = [...this.notification.value];
        newNotification.unshift(notification);
        this.notification.next(newNotification);
    }

    findAll(): notificationStruct[] {
        return this.notification.value;
    }

}