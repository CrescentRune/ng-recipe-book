import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
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
    constructor(private http: HttpClient) {}

    user = new Subject<User>();


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
            tap(this.handleAuth)
        )
    }

    private handleAuth(respData: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + (+respData.expiresIn * 1000));
        const user = new User(respData.email, respData.localId, respData.idToken, expirationDate)
        this.user.next(user);
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