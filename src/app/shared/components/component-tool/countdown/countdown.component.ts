import { Component, OnInit, ViewChildren, TemplateRef, ViewChild, Input, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { ComponentActionService } from '../../../services/component-action.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  @Input('element') element;
  @ViewChild('countdown') countdown: ElementRef;
  private intv;
  constructor(private datePipe: DatePipe, private cService: ComponentActionService) {
    datePipe = new DatePipe('vi');
  }

  ngOnInit() {
    this.setCountdown();
    this.cService.componentUpdated.subscribe(data => {
      if (data === 'countdown') {
        this.setCountdown();
      }
    });
  }
  private setCountdown() {
    clearInterval(this.intv);
    this.intv = setInterval(() => {
      (this.element.elementRef.nativeElement as HTMLElement).style.removeProperty('width');
      const countDownDate = this.element.component.countdown.endTime;
      // Update the count down every 1 second
      // Get todays date and time
      const now = new Date().getTime();

      // Find the distance between now an the count down date
      const distance = countDownDate - now;
      let days, hours, minutes, seconds;
      if (distance > 0) {
        // Time calculations for days, hours, minutes and seconds
        days = Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds = Math.floor((distance % (1000 * 60)) / 1000);
        (this.countdown.nativeElement as HTMLElement).innerHTML =
          '<span>' + this.pad(days, 2) + '</span><span class="two-dots">:</span><span>'
          + this.pad(hours, 2) + '</span><span class="two-dots">:</span><span>'
          + this.pad(minutes, 2) + '</span><span class="two-dots">:</span><span>'
          + this.pad(seconds, 2) + '</span>';
      } else {
        (this.countdown.nativeElement as HTMLElement).innerHTML =
          '<span>00</span><span class="two-dots">:</span><span>00</span><span class="two-dots">:</span><span>'
          + '00</span><span class="two-dots">:</span><span>'
          + '00</span>';
        clearInterval(this.intv);
      }
    }, 1000);
  }
  private pad(num: number, size: number): string {
    let s = num.toString();
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

}
