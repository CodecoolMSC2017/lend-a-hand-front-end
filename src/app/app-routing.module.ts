import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginGuard} from './login.guard';
import {MainPageComponent} from './main-page/main-page.component';
import {SingleAdComponent} from './single-ad/single-ad.component';
import {CategoriesComponent} from './categories/categories.component';
import {VerificationComponent} from './verification/verification.component';

const routes: Routes = [
    {path: '', redirectTo: '/categories', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'main', component: MainPageComponent},
    {path: 'ad', component: SingleAdComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'mainAfterLogin', component: MainPageComponent, canActivate: [LoginGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [LoginGuard]},
    {path: 'verification', component: VerificationComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {


}
