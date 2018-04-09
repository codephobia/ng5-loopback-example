import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserApi as UserService } from '../lbservices';

@Component({
    selector: 'app-user-nav',
    templateUrl: './user-nav.component.html',
    styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {

    constructor(
        protected user: UserService,
        protected router: Router
    ) { }

    ngOnInit() {
    }

    isAuthenticated(): boolean {
        return this.user.isAuthenticated();
    }

    getUsername(): string {
        return this.user.getCachedCurrent().username;
    }

    onLogout() {
        this.user.logout()
            .subscribe(
                res => {},
                err => {
                    console.error(err);
                },
                () => {
                    this.router.navigate(['/login']);
                }
            );
    }
}
