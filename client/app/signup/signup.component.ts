import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/finally';

import { UserApi as UserService, User } from '../lbservices';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
    selector: '.app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [
        SnackBarService,
    ],
})
export class SignupComponent implements OnInit {
    private loading: boolean = false;
    private username: string = '';
    private email: string = '';
    private password: string = '';
    private cpassword: string = '';

    constructor(
        private router: Router,
        protected user: UserService,
        protected snackbar: SnackBarService
    ) { }

    ngOnInit() {
    }

    validPassword(): boolean {
        // validate password entered
        if (!this.password.length) {
            this.snackbar.notify('Password is required', ['error']);
            return false;
        }

        // validate confirmed password
        if (!this.cpassword.length) {
            this.snackbar.notify('Confirm your password', ['error']);
            return false;
        }

        // validate passwords match
        if (this.password !== this.cpassword) {
            this.snackbar.notify('Passwords do not match', ['error']);
            return false;
        }

        return true;
    }

    onSignup(): void {
        if (!this.validPassword()) {
            return;
        }

        this.loading = true;

        this.user.create({
                username: this.username,
                email: this.email,
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
                    this.snackbar.notify('Signup successful', ['success']);
                }
            );
    }

}

@Injectable()
export class CanActivateSignup implements CanActivate {
    constructor(private user: UserService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return !this.user.isAuthenticated();
    }
}
