import { slide } from '../animations';
import { eventTypes } from '../event-types';

import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [ slide ]
})
export class SliderComponent implements OnInit {
  @Input() orientation?: string;
  slideState: any;
  type = '';
  constructor() { }

  ngOnInit() {
    if (this.orientation === 'y') {
      this.type = 'v';
    }
    this.slideState = { value: `${this.type}cancel`};
  }

  openPanel() {
    this.togglePanel({type: eventTypes.clickeInside, amount: 140});
  }

  animationDone(event) {
    if (this.slideState && this.slideState.params && this.slideState.params.amount) {
      if (this.orientation === 'y') {
        event.element.style.height = this.slideState.params.amount + 'px';
      } else {
        event.element.style.width = this.slideState.params.amount + 'px';
      }
    }
  }

  togglePanel(event) {
    if (event.type === eventTypes.cancel) {
      this.slideState = { value: `${this.type}cancel` };
    } else {
      if (this.slideState.value !== `${this.type}out` && event.type !== eventTypes.clickeInside) {
        this.slideState = { value: `${this.type}out`, params: { amount: 30 }};
      } else if (this.slideState.value === `${this.type}out`) {
        this.slideState = { value: `${this.type}in`, params: { amount: event.amount } };
      }
    }
  }

}