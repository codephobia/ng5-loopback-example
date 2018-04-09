import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';

import { UserApi as UserService } from '../lbservices';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    private loading: boolean = false;
    private username: string;
    private password: string;

    constructor(protected user: UserService, private router: Router) { }

    isAuthenticated(): boolean {
        return this.user.isAuthenticated();
    }

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
                res => {
                    console.log(res);
                },
                err => {
                    console.error(err);
                },
                () => {
                    this.router.navigate(['/']);
                }
            );
    }
}
