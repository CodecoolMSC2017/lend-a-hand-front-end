import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AppRoutingModule} from './/app-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {MainPageComponent} from './main-page/main-page.component';
import { AdFilterComponent } from './ad-filter/ad-filter.component';
import { AdsComponent } from './ads/ads.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        MainPageComponent,
        AdFilterComponent,
        AdsComponent,
        HeaderBarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
