import { slide } from '../animations';
import { eventTypes } from '../event-types';

import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
  animations: [ slide ]
})
export class ToolboxComponent implements OnInit {
  slideState: any = { value: 'in'};
  constructor() { }

  ngOnInit() {
  }

  openPanel() {
    this.togglePanel({type: eventTypes.clickeInside, width: 140});
  }

  animationDone(event) {
    if (this.slideState && this.slideState.params && this.slideState.params.width) {
      event.element.style.width = this.slideState.params.width + 'px';
    }
  }

  togglePanel(event) {
    if (event.type === eventTypes.cancel) {
      this.slideState = { value: 'cancel' };
    } else {
      if (this.slideState.value !== 'out' && event.type !== eventTypes.clickeInside) {
        this.slideState = { value: 'out', params: { width: 30 }};
      } else if (this.slideState.value === 'out') {
        this.slideState = { value: 'in', params: { width: event.width } };
      }
    }
  }

}
