import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})

export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(
    private _db: AngularFireDatabase,
    private angularFireMessaging: AngularFireMessaging,
    private _angAuth: AngularFireAuth
  ) {
    this.angularFireMessaging.messaging.subscribe((_messaging: any) => {
      // _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging._next = (payload: any) => {this._show(payload) };
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    }
    );
  }
  private updateToken(token) {
    this._angAuth.authState
      .pipe(take(1))
      .subscribe((user: any) => {
        if (!user) {
          return;
        }
        const data = { [user.id]: token };
        this._db.object('fcmTokens/').update(data);
      });
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.updateToken(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload: any) => {
      console.log('new message received. ', payload);
      alert(payload.notification.body);
      // this.currentMessage.next(payload);
    });
  }
  tokenChanges() {
    this.angularFireMessaging.tokenChanges.subscribe(r => {
      console.log(r);
    });
  }
  private _show(payload: any): void {
    alert(payload.notification.body);
  }
  // getPermission(){
  //   this.angularFireMessaging.requestPermission
  //   .subscribe(() => {

  //   })

  // }
}
