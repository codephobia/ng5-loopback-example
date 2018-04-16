import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent, CanActivateLogin } from './login/login.component';
import { SignupComponent, CanActivateSignup } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { ProfileRoutes, ProfileProviders } from './profile/profile.routes';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [CanActivateLogin] },
    { path: 'signup', component: SignupComponent, canActivate: [CanActivateSignup] },
    ...ProfileRoutes,
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
    providers: [
        CanActivateLogin,
        CanActivateSignup,
        ...ProfileProviders,
    ],
})
export class AppRoutingModule { }
