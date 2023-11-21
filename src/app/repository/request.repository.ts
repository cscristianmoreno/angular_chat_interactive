import { requestStruct } from "../models/request.model";

export declare interface RequestRepository {
    save(request: requestStruct): void;

    delete(request: requestStruct): void;

    findById(id_received: number | string, id_sender: number | string): requestStruct | undefined;
}