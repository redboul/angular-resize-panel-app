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
  @Input() direction?: string;
  @Input() defaultSize?: number;
  @Input() reducedSize?: number;
  slideState: any;
  type = '';
  constructor() { }

  ngOnInit() {
    if (this.direction === 'y') {
      this.type = 'v';
    }
    this.slideState = { value: `${this.type}cancel`};
    if (!this.defaultSize) {
      this.defaultSize = 140;
    }
    if (!this.reducedSize) {
      this.reducedSize = 30;
    }
  }

  openPanel() {
    this.togglePanel({type: eventTypes.clickedInside, amount: this.defaultSize});
  }

  animationDone(event) {
    if (this.slideState && this.slideState.params && this.slideState.params.amount) {
      if (this.direction === 'y') {
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
      if (this.slideState.value !== `${this.type}out` && event.type !== eventTypes.clickedInside) {
        this.slideState = { value: `${this.type}out`, params: { amount: this.reducedSize }};
      } else if (this.slideState.value === `${this.type}out`) {
        this.slideState = { value: `${this.type}in`, params: { amount: event.amount || this.defaultSize} };
      }
    }
  }

}
