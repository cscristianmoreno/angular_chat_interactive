import { Injectable } from "@angular/core";
import { RequestRepository } from "../repository/request.repository";
import { BehaviorSubject, Observable } from "rxjs";
import { requestStruct } from "../models/request.model";

@Injectable({
    providedIn: "root"
})

export class RequestsDTO implements RequestRepository {

    request: BehaviorSubject<requestStruct[]> = new BehaviorSubject<requestStruct[]>([]);
    readonly request$: Observable<requestStruct[]> = this.request.asObservable();

    save(request: requestStruct): void {
        const requests: requestStruct[] = [...this.request.value];
        requests.push(request);
        this.request.next(requests);
    }
    
    delete(request: requestStruct): void {
        const requests: requestStruct[] = [...this.request.value].filter((req: requestStruct) => 
        (req.id_sender !== request.id_sender) || (req.id_received !== request.id_received));

        this.request.next(requests);
    }

    findById(id_received: string | number, id_sender: number | string): requestStruct | undefined {
        const requests: requestStruct | undefined = [...this.request.value].find((req: requestStruct) => 
        (req.id_received === id_received) && (req.id_sender === id_sender));
        return requests;
    }
}