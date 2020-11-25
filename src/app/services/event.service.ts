import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './../services/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Event} from '../models/event.model';

import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private eventCollection: AngularFirestoreCollection<Event>;
  public events: Array<Event> = [];

  private eventChanged$: BehaviorSubject<Array<Event>> = new BehaviorSubject<Array<Event>>(null);
  public eventsChanged: Observable<Array<Event>> = this.eventChanged$.asObservable();

  constructor(public db: AngularFirestore, private authService: AuthService) {
    this.authService.getUserDetails();
    this.eventCollection = db.collection<Event>('/events');
  }

  getEvents() {
    return this.events;
  }

  getEvent(id) {
    return this.eventCollection.doc<Event>(id).valueChanges();
  }

  updateEvent(event: Event, id: string) {
    return this.eventCollection.doc(id).update(event);
  }

  addEvent(event: any): Array<any> {
    this.events.push(event);
    this.eventChanged$.next(this.events);
    return this.events;
  }

  removeEvent(id) {
    return this.eventCollection.doc(id).delete();
  }

  getNextAllDayEvents(numberOfEvents) {
    const currentDate =  moment().format('YYYY-MM-DDTHH:mm');
    const currentUser = this.authService.getUserDetails();
    return this.db.collection<Event>('users/' + currentUser + '/events', ref => ref.where('startTime', '>=', currentDate).limit(numberOfEvents)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
