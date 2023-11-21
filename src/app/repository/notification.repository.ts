import { notificationStruct } from "../models/notification.model";

export declare interface NotificationRepository {
    create(notification: notificationStruct): void;

    findAll(): notificationStruct[];
}