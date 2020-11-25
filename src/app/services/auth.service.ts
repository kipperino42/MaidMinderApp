import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable, of} from "rxjs";
import { switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import firebase from "firebase";
import auth = firebase.auth;
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore, public router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: User) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  } // end constructor

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    const user = await this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  updateUserData({uid, email, displayName}: User) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${uid}`);

    const data =  {
      uid,
      email,
      displayName
    };

    const uRef = userRef.set(data, {merge: true});
    return uRef;
  }


  getUserDetails() {
    return this.afAuth.currentUser;
  }

  getUserName() {
    return this.afAuth.currentUser;
  }

}



