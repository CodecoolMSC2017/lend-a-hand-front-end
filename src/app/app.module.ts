import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AppRoutingModule} from './app-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {MainPageComponent} from './main-page/main-page.component';
import {httpInterceptorProviders} from '../http-interceptors';

import {AdsComponent} from './ads/ads.component';
import {HeaderBarComponent} from './header-bar/header-bar.component';
import {SingleAdComponent} from './single-ad/single-ad.component';
import {CategoriesComponent} from './categories/categories.component';
import {VerificationComponent} from './verification/verification.component';
import {RatingsComponent} from './ratings/ratings.component';
import {CreateAdComponent} from './create-ad/create-ad.component';
import {AdsByAdvertiserComponent} from './ads-by-advertiser/ads-by-advertiser.component';
import {ApplicationsComponent} from './applications/applications.component';
import {MessagesComponent} from './messages/messages.component';
import {RateComponent} from './rate/rate.component';
import {UsersComponent} from './users/users.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {ReportsComponent} from './reports/reports.component';
import {ReportComponent} from './report/report.component';
import {PaypalComponent} from './paypal/paypal.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        MainPageComponent,
        AdsComponent,
        HeaderBarComponent,
        SingleAdComponent,
        CategoriesComponent,
        VerificationComponent,
        CreateAdComponent,
        RatingsComponent,
        AdsByAdvertiserComponent,
        ApplicationsComponent,
        MessagesComponent,
        RateComponent,
        UsersComponent,
        NotificationsComponent,
        ReportsComponent,
        ReportComponent,
        PaypalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [httpInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
