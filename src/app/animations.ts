import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideIn = trigger('slideIn', [
  state('*', style({
    width: '0',
  })),
  state('in', style({
    'min-width': '100px',
    'max-width': '300px',
    width: '*'
  })),
  state('out',   style({
    'min-width': '20px',
    'max-width': '0',
    width: '0'
  })),
  transition('out => in', animate('300ms ease-out')),
  transition('in => out', animate('300ms ease-out'))
]);