import { CalendarComponent } from 'ionic2-calendar';
import {Component, ViewChild, Inject, LOCALE_ID, OnChanges, SimpleChanges} from '@angular/core';
import { EventService } from '../services/event.service';
import { Subscription } from 'rxjs';
import {Calendar} from '../models/calendar.model';
import {ModalController} from "@ionic/angular";
import {EventCreatorComponent} from "../event-creator/event-creator.component";
import { Event } from '../models/event.model';

@Component({
  selector: 'app-calendar-tab',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})

export class CalendarPage implements OnChanges {
  public eventSource;
  public viewTitle;
  private eventSubscription: Subscription = new Subscription();
  public lastDaySelected: any = '';
  public isToday: boolean = false;
  public calendar: Calendar = new Calendar('month', new Date(), true, 'MMMM yyyy', 0, 1);

  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

  constructor(@Inject(LOCALE_ID) private locale: string, private eventService: EventService, public modalController: ModalController) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EventCreatorComponent,
      cssClass: 'my-custom-class',
      componentProps: { date: this.lastDaySelected }
    });
    return await modal.present();
  }

  loadEvents(source?) {
    if (source) {
      this.eventSource = source;
    }
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

  ionViewWillLeave() {
    this.eventSubscription.unsubscribe();
  }

  ngOnInit() {
    this.eventService.eventsChanged.subscribe((eventArray: Array<Event>) => {
      this.loadEvents(eventArray);
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected($event) {
    const d = new Date($event.selectedTime);
    this.lastDaySelected = d.toString();
  }

  async createEvent() {
    await this.presentModal();
  }
}
