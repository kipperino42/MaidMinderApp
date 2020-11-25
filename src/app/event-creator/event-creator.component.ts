import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event.model';
import { ModalController} from "@ionic/angular";
import { EventService} from "../services/event.service";
import * as moment from 'moment';


@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss'],
})

export class EventCreatorComponent implements OnInit {
  event: Event;
  date: string;
  selectedLength: number = 15;

  constructor(public modalController: ModalController, public eventService: EventService) {}

  ngOnInit() {
    this.event = new Event();
    console.log('this.date on ngOnInit', this.date);
  }

  onCancel() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async onSave(data: any) {
    // TO DO: validate data before constructing object
    const date = this.date;
    let startTime = data.startTime;

    //console.log('data', data);
    console.log(date);
    console.log('startTime', startTime);
    const n = date.split(' ');
    const o = startTime.split('T');
    const newDateString = n[0] + ' ' + n[1] + ' ' + n[2] + ' ' + n[3];
    let temp =o[1];
    let newTimeString = temp.split('.')[0];
    //const newTimeString = o[4]+ ' '  + o[5] + ' '  + o[6] + ' ' + o[7] + ' ' + o[8];
    const newCombined = newDateString + ' ' + newTimeString;
    startTime = new Date(newCombined);
    //console.log('endTime', endTime);
    const title = data.title;
    const endTime = moment(startTime).add(data.length, 'minutes').toDate();

    const calendarItem = { startTime, endTime, title };

    console.log('calendarItem', calendarItem);

    this.event = new Event(data);
    const didSave = await this.eventService.addEvent(calendarItem);

    if (didSave) {
      await this.modalController.dismiss({ 'dismissed': true });
    } else { }
  }

  onEventLengthChange(e) {
    this.selectedLength = e;
  }
}
