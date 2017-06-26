import { slideIn } from '../animations';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
  animations: [ slideIn ]
})
export class ToolboxComponent implements OnInit {
  slideInState = 'in';
  constructor() { }

  ngOnInit() {
  }

  openPanel() {
    if(this.slideInState === 'out') {
      this.slideInState = 'in';
    }
  }

  togglePanel(){
    if(this.slideInState === 'in') {
      this.slideInState = 'out';
    } else {
      this.slideInState = 'in';
    }
  }

}
