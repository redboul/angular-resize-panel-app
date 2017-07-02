import { animate, animateChild, state, style, transition, trigger } from '@angular/animations';
import { animation } from '@angular/animations';

const slideInHorizontal = animation([ animate('400ms ease', style({
    width: '{{ width }}px'
  }))]);
const slideOutHorizontal = animation([ animate('400ms ease', style({
    width: '30px'
  }))]);
export const slideHorizontal = trigger('slide', [
  transition('* => out', [slideOutHorizontal]),
  transition('out => in', [slideInHorizontal], { params: {width: 140} })
]);

const slideInVertical = animation([ animate('400ms ease', style({
    height: '{{ height }}px'
  }))]);
const slideOutVertical = animation([ animate('400ms ease', style({
    height: '30px'
  }))]);
export const slideVertical = trigger('slide', [
  transition('* => out', [slideOutVertical]),
  transition('out => in', [slideInVertical], { params: {height: 140} })
]);