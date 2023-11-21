import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";


@Injectable({
    providedIn: "root"
})

export class IconService {
    
    constructor(private httpService: HttpService, private domSanitizer: DomSanitizer) {

    }

    public async getIcon(icon: string): Promise<SafeHtml> {
        const result: string = await this.httpService.getIcon(icon);
        const sanitizer: SafeHtml = this.domSanitizer.bypassSecurityTrustHtml(result);
        return sanitizer;
    }
}