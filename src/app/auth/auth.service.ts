import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;
    authErrorMessage: string;
    

    constructor(private router: Router) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                //response => console.log(response)
                response => {
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token
                    )
                }
            )
            .catch(          
                error =>  this.authErrorMessage = error          
            )
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                //response => console.log(response)
                response => {
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getIdToken()
                    .then(
                      (token: string) => this.token = token
                    )
                }
            )
            .catch(
                error =>  this.authErrorMessage = error
            );        
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          );
        return this.token;
      }

    isAuthErrorMessage() {
        //alert("error: " + this.authErrorMessage);
        return this.authErrorMessage;
    }

    isAuthenticated() { 
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }
}