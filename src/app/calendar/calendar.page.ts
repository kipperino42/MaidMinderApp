import { CalendarComponent } from 'ionic2-calendar';
import {Component, ViewChild, OnInit, Inject, LOCALE_ID, OnChanges, SimpleChanges} from '@angular/core';
import { EventService } from '../services/event.service';
import { Subscription } from 'rxjs';
import {Calendar} from '../models/calendar.model';

@Component({
  selector: 'app-calendar-tab',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})

export class CalendarPage implements OnChanges {

  eventSource;
  viewTitle;

  // Will manage subscribe/unsubscribe from Firebase
  private eventSubscription: Subscription = new Subscription();
  public lastDaySelected: any = ''; //Stores last date selected by user on month calendar view

  public calendar: Calendar = new Calendar('month', new Date(), true, 'MMMM yyyy', 0, 1);

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  public isToday: boolean = false;

  constructor(@Inject(LOCALE_ID) private locale: string, private eventService: EventService) {
  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }

  createRandomEvents() {
    const events = [];
    for (let i = 0; i < 50; i += 1) {
      const date = new Date();
      const eventType = Math.floor(Math.random() * 2);
      const startDay = Math.floor(Math.random() * 90) - 45;
      let endDay = Math.floor(Math.random() * 2) + startDay;
      let startTime;
      let endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true
        });
      } else {
        const startMinute = Math.floor(Math.random() * 24 * 60);
        const endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
      }
    }
    return events;
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date: Date) => {
    const current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  }
  

  onCurrentDateChanged(event: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  /*ionViewDidEnter() {
    this.eventSubscription = this.eventService.getEvents().subscribe(res => {

      res.forEach(event => {
        const start = new Date(event.startTime);
        const end = new Date(event.endTime);
        event.startTime = start;
        event.endTime = end;
      });

      this.eventSource = res;
      console.log(JSON.stringify(res));
    });
  }*/

  ionViewWillLeave() {
    this.eventSubscription.unsubscribe();
  }

  ngOnInit() {
  }



  // Selected date range and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected($event) {
    const d = new Date($event.selectedTime);
    this.lastDaySelected = d.toString();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
