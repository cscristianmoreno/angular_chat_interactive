import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: "[directiveArrayEmpty]"
})

export class ArrayDirective implements OnInit {

    constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
    }

    ngOnInit(): void {
        const elementImg: HTMLImageElement = this.renderer2.createElement("img");

        elementImg.src = "https://static-00.iconduck.com/assets.00/box-search-icon-512x498-njbb3quu.png";

        this.renderer2.appendChild(this.elementRef.nativeElement, elementImg);

        this.renderer2.setStyle(elementImg, "width", "100px");
        this.renderer2.setStyle(elementImg, "height", "100px");

        const elementSpan: HTMLSpanElement = this.renderer2.createElement("span");
        elementSpan.innerHTML = "<br/>Aún no hay nada por aquí";

        this.renderer2.setStyle(elementSpan, "color", "gray");
        this.renderer2.setStyle(elementSpan, "font-weight", "500");
        this.renderer2.setStyle(elementSpan, "font-size", "12px");

        this.renderer2.appendChild(this.elementRef.nativeElement, elementSpan);

    }

}