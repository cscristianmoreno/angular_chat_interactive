import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { AiService } from "./services/ai.service";
import { MenuComponent } from "./views/menu/menu.component";
import { ChatComponent } from "./views/chat/chat.component";
import { AsideComponent } from "./views/aside/aside.component";
import { BreakpointObserver, BreakpointState, Breakpoints } from "@angular/cdk/layout";
import { EffectService } from "./services/effect.service";
import { ChatService } from "./services/chat.service";
import { ResponsiveService } from "./services/responsive.service";
import { ResponsiveSections } from "./enums/responsive.enum";

@Component({
    selector: "app-component",
    templateUrl: "./app.component.html",
    styleUrls: [
        "./app.component.css"
    ],
    providers: [
        AiService
    ]
})

export class AppComponent implements AfterViewInit {

    @ViewChild(MenuComponent, { read: ElementRef })
    private menuComponent!: ElementRef;

    @ViewChild(ChatComponent, { read: ElementRef })
    private chatComponent!: ElementRef;

    @ViewChild(AsideComponent, { read: ElementRef })
    private asideComponent!: ElementRef;

    @ViewChild("sectionRef")
    private sectioRef!: ElementRef;

    @HostListener("window: resize", ["$event"])
    onResize(): void {
        if (!this.responsive) {
            return;
        }

        this.responsiveService.section.next(this.responsiveService.section.value);
    }

    protected responsive!: boolean;

    constructor(private iaService: AiService, private breakpointObserver: BreakpointObserver, private effectService: EffectService,
        private chatService: ChatService, private responsiveService: ResponsiveService) {
        
    }

    async ngAfterViewInit(): Promise<void> {
        await this.iaService.createUsers();
        this.iaService.aiStart();

        
        this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe((responsive: BreakpointState) => {
            const { matches } = responsive;

            this.responsive = matches;
            
            if (!matches) {
                this.responsiveService.section.next(ResponsiveSections.SECTION_MENU);
                return;
            }
        });

        this.chatService.chatIndex.subscribe((res: number | string | null) => {
            if (!res) {
                return;
            }
            
            if (!this.responsive) {
                return;
            }

            this.responsiveService.section.next(ResponsiveSections.SECTION_CHAT);

            this.responsiveService.section$.subscribe((res: number) => {
                // eslint-disable-next-line prefer-const
                let position: number = this.menuComponent.nativeElement.offsetLeft;
    
                switch(res) {
                    case ResponsiveSections.SECTION_MENU: {
                        position = 0;
                        break;
                    }
                    case ResponsiveSections.SECTION_CHAT: {
                        position -= this.chatComponent.nativeElement.offsetLeft;
                        break;
                    }
                    case ResponsiveSections.SECTION_ASIDE: {
                        position -= this.asideComponent.nativeElement.offsetLeft;
                        break;
                    }
                }
    
                this.effectService.moveEffect(this.menuComponent.nativeElement, position);
            });
        });
    }
}