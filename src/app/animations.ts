import { animate, animateChild, state, style, transition, trigger } from '@angular/animations';
import { animation } from '@angular/animations';

const slideIn = animation([ animate('400ms ease', style({
    width: '{{ width }}px'
  }))]);
const slideOut = animation([ animate('400ms ease', style({
    width: '30px'
  }))]);
export const slide = trigger('slide', [
  transition('* => out', [slideOut]),
  transition('out => in', [slideIn], { params: {width: 140} })
]);