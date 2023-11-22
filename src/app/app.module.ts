import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from "./views/header/header.component";
import { MenuComponent } from './views/menu/menu.component';
import { MaterialModule } from './material.module';
import { SearchComponent } from './components/search/search.component';
import { ChatComponent } from './views/chat/chat.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MessageComponent } from './components/message/message.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ChatProfileComponent } from './components/chat.profile/chat.profile.component';
import { GroupComponent } from './components/group/group.component';
import { SuggestionComponent } from './components/suggestion/suggestion.component';
import { AsideComponent } from "./views/aside/aside.component";
import { ChatMenuComponent } from './components/chat.menu/chat.menu.component';
import { ContactComponent } from './components/contacts/contact.component';
import { RequestComponent } from './components/request/request.component';
import { ButtonComponent } from './components/button/button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { IconComponent } from './components/icon/icon.component';
import { AvatarDirective } from './directives/avatar.directive';
import { AlertComponent } from './components/alert/alert.component';
import { ArrayDirective } from './directives/array.directive';
import { ArrayEmptyComponent } from './components/array.empty/array.empty.component';
import { AvatarGroupComponent } from './components/avatar.group/avatar.group.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        MenuComponent,
        SearchComponent,
        ChatMenuComponent,
        ChatComponent,
        ChatProfileComponent,
        MessageComponent,
        AvatarComponent,
        GroupComponent,
        NotificationComponent,
        SuggestionComponent,
        AsideComponent,
        ContactComponent,
        RequestComponent,
        ButtonComponent,
        ProfileComponent,
        IconComponent,
        AlertComponent,
        ArrayEmptyComponent,
        AvatarGroupComponent,
        
        AvatarDirective,
        ArrayDirective
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
