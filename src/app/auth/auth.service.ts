import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    private logOutTimer: any;
    user = new BehaviorSubject<User>(null);

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    signUp(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7sCZ7aU6b1OqDUEGfC03XeKK220A04Dw`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(this.handleAuth)
            );
    }

    logIn(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7sCZ7aU6b1OqDUEGfC03XeKK220A04Dw',
            {email, password, returnSecureToken: true}
        )
        .pipe(
            catchError(this.handleError),
            tap(respData => { this.handleAuth(respData) })
        )
    }

    logOut() {
        //Cancel token
        this.user.next(null);
        localStorage.removeItem('userData');

        if (this.logOutTimer) {
            clearTimeout(this.logOutTimer);
        }
        this.router.navigate(['/auth']);
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.logOutTimer = setTimeout(() => {this.logOut()}, expirationDuration)
    }

    private handleAuth(respData: AuthResponseData) {
        const expiresInMs = +respData.expiresIn * 1000;
        const expirationDate = new Date(new Date().getTime() + expiresInMs);
        const user = new User(respData.email, respData.localId, respData.idToken, expirationDate)
        this.user.next(user);
        this.autoLogout(expiresInMs);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResp: any) {
        let errorMsg = 'An unknown error ocurred';
        if (!errorResp.error || !errorResp.error.error) {
            return throwError(errorMsg);
        }

        switch (errorResp.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = 'This email exists. Please log in.'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'Please register this email to the application'
                break;
            case 'INVALID_PASSWORD':
                errorMsg = 'Username and password do not match. Please try again.'
                break;
            case 'USER_DISABLED':
                errorMsg = 'User has been disabled by administrator. Please contact so-and-so if you believe this is a mistake.'
        }

        return throwError(errorMsg);
    }

}