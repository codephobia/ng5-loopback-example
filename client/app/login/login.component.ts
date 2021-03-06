import { Injectable, Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/finally';

import { UserApi as UserService } from '../lbservices';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
    selector: '.app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [
        SnackBarService,
    ],

})
export class LoginComponent {
    private loading: boolean = false;
    private username: string;
    private password: string;

    constructor(
        protected user: UserService,
        private router: Router,
        private snackbar: SnackBarService
    ) {}

    onLogin() {
        this.loading = true;

        this.user.login({
                username: this.username,
                password: this.password
            })
            .finally(() => {
                this.loading = false;
            })
            .subscribe(
                res => {},
                data => {
                    this.snackbar.notify(data.message, ['error']);
                    console.error('err: ', data);
                },
                () => {
                    this.router.navigate(['/']);
                    this.snackbar.notify('Login successful', ['success']);
                }
            );
    }
}

@Injectable()
export class CanActivateLogin implements CanActivate {
    constructor(private user: UserService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return !this.user.isAuthenticated();
    }
}
