import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ComponentActionService } from '../../../../../shared/services/component-action.service';

@Component({
  selector: 'app-panel-countdown',
  templateUrl: './panel-countdown.component.html',
  styleUrls: ['./panel-countdown.component.scss']
})
export class PanelCountdownComponent implements OnInit {
  @Input('component') component;
  constructor(private datePipe: DatePipe, private cService: ComponentActionService) { }

  get date() {
    const dateLong = this.component.countdown.endTime;
    return new Date(dateLong);
  }
  set date(value: Date) {
    const date = this.date;
    date.setDate(value.getDate());
    date.setMonth(value.getMonth());
    date.setFullYear(value.getFullYear());
    this.component.countdown.endTime = date.getTime();
    this.changeCountdown();
  }
  get hours() {
    const dateLong = this.component.countdown.endTime;
    return this.datePipe.transform(dateLong, 'HH');
  }
  set hours(value) {
    if (!value || !parseInt(value, 10)) {
      value = '0';
    }
    const date = this.date;
    date.setHours(parseInt(value, 10));
    this.component.countdown.endTime = date.getTime();
    this.changeCountdown();
  }
  get minutes() {
    const dateLong = this.component.countdown.endTime;
    return this.datePipe.transform(dateLong, 'mm');
  }
  set minutes(value) {
    if (!value || !parseInt(value, 10)) {
      value = '0';
    }
    const date = this.date;
    date.setMinutes(parseInt(value, 10));
    this.component.countdown.endTime = date.getTime();
    this.changeCountdown();
  }
  ngOnInit() {
  }
  changeCountdown() {
    this.cService.componentUpdated.emit('countdown');
  }
}
