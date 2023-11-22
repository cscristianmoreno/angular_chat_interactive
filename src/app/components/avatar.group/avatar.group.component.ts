import { Component, Input } from "@angular/core";

@Component({
    selector: "app-avatar-group",
    templateUrl: "./avatar.group.component.html",
    styleUrls: [
        "./avatar.group.component.css",
        "../../../assets/css/sizes.css"
    ]
})

export class AvatarGroupComponent {
    protected letters: string[] = [];

    @Input()
    set name(group_name: string) {
        this.letters = [];
        
        const capitalize: string[] = group_name.split(" ");
        let firstLetter: string = "";

        capitalize.forEach((str: string, num: number) => {
            if ((num + 1) < capitalize.length) {
                firstLetter += str[0].toUpperCase() + ".";
            }
            else {
                firstLetter += str[0].toUpperCase();
            }
        });

        this.letters.push(firstLetter);
    }

    @Input()
    size: string = "sm";
}