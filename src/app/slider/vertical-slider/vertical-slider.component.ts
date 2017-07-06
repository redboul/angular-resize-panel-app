import { slideVertical } from '../animations';
import { eventTypes } from '../event-types';

import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'vertical-slider',
  templateUrl: './vertical-slider.component.html',
  styleUrls: ['./vertical-slider.component.css'],
  animations: [ slideVertical ]
})
export class VerticalSliderComponent implements OnInit {
  slideState: any = { value: 'in'};
  constructor() { }

  ngOnInit() {
  }

  openPanel() {
    this.togglePanel({type: eventTypes.clickeInside, height: 140});
  }

  animationDone(event) {
    if (this.slideState && this.slideState.params && this.slideState.params.height) {
      event.element.style.height = this.slideState.params.height + 'px';
    }
  }

  togglePanel(event) {
    if (event.type === eventTypes.cancel) {
      this.slideState = { value: 'cancel' };
    } else {
      if (this.slideState.value !== 'out' && event.type !== eventTypes.clickeInside) {
        this.slideState = { value: 'out', params: { height: 30 }};
      } else if (this.slideState.value === 'out') {
        this.slideState = { value: 'in', params: { height: event.height } };
      }
    }
  }

}
