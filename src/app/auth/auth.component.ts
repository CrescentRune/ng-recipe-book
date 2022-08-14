import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isSignUp = false;
    isLoading = false;
    error: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isSignUp = !this.isSignUp;
    }

    onAuthenticate(form: NgForm) {
        if (!form.valid) return;
        const email = form.value.email;
        const password = form.value.password;       
        
        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isSignUp) {
            authObs = this.authService.signUp(email, password);
        } else {
            authObs = this.authService.logIn(email, password);
        }

        authObs.subscribe(
            (data) => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            (errorMsg) => {
                this.error = errorMsg;
                this.isLoading = false;
            }
        );
        form.reset();
    }

}