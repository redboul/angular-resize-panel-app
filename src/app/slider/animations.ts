import { animate, animateChild, state, style, transition, trigger } from '@angular/animations';
import { animation } from '@angular/animations';

const slideInHorizontally = animation([ animate('400ms ease', style({
    width: '{{ amount }}px'
  }))]);
const slideOutHorizontally = animation([ animate('400ms ease', style({
    width: '30px'
  }))]);
const slideInVertically = animation([ animate('400ms ease', style({
    height: '{{ amount }}px'
  }))]);
const slideOutVertically = animation([ animate('400ms ease', style({
    height: '30px'
  }))]);
export const slide = trigger('slide', [
  // transition('* => out', [slideOutHorizontally]),
  transition('in => out', [slideOutHorizontally]),
  transition('cancel => out', [slideOutHorizontally]),
  transition('out => in', [slideInHorizontally], { params: {amount: 140} }),
  transition('vcancel => vout', [slideOutVertically]),
  transition('vin => vout', [slideOutVertically]),
  transition('vout => vin', [slideInVertically], { params: {amount: 140} })
]);
