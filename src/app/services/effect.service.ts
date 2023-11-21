import { ElementRef, Injectable, QueryList, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class EffectService {

    private renderer2: Renderer2;
    private lastElement!: ElementRef;

    constructor(private rendererFactory2: RendererFactory2) {
        this.renderer2 = rendererFactory2.createRenderer(null, null);
    }

    public async createEffect(element: QueryList<ElementRef>, position: number): Promise<void> {
        const elementRef: ElementRef | undefined = element.get(position)?.nativeElement;

        if (!elementRef) {
            return;
        }

        await this.addEffect(elementRef);
    }

    public async addEffect(element: ElementRef | undefined): Promise<void> {
        if (!element) {
            return;
        }

        if (this.lastElement === element) {
            return;
        }

        this.renderer2.setStyle(element, "opacity", 0);
        this.renderer2.setStyle(element, "transform", "scale(0)");
        this.renderer2.setStyle(element, "transition", "0.25s");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await new Promise((resolve: any) => {
            setTimeout(() => {
                this.renderer2.setStyle(element, "opacity", 1);
                this.renderer2.setStyle(element, "transform", "initial");
                resolve(true);
            }, 250);
        });
    }

    public moveEffect(element: ElementRef, move: number): void {
        if (!element) {
            return;
        }


        this.renderer2.setStyle(element, "transition", "1s");
        this.renderer2.setStyle(element, "margin-left", `${move}px`);
    }
}