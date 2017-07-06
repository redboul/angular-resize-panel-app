import { Directive, ElementRef, HostListener, OnInit, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';

@Directive({
  selector: '[resize-handle]'
})
export class ResizeHandleDirective {

  private mouseDown = false;
  public currentEvent;
  private mouseUpSubscription: Subscription;
  private mouseMoveSubscription: Subscription;
  public mouseMove$: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  public mouseDown$: EventEmitter<string> = new EventEmitter<string>();
  constructor(private element: ElementRef) { }

  @HostListener('mousedown', ['$event'])
  onMouseDown(mouseDownEvent: MouseEvent) {
    this.currentEvent = mouseDownEvent;
    this.unsubscribeFromEvent();
    this.mouseMoveSubscription = Observable.fromEvent(document, 'mousemove').subscribe((event: MouseEvent) => this.onMouseMove(event));
    this.mouseUpSubscription = Observable.fromEvent(document, 'mouseup').subscribe((event: MouseEvent) => this.onMouseUp(event));
  }
  onMouseUp(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.screenX === this.currentEvent.screenX && event.screenY === this.currentEvent.screenY) {
      this.mouseDown$.next('click');
    }
    this.unsubscribeFromEvent();
  }

  unsubscribeFromEvent() {
    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
      this.mouseMoveSubscription = null;
    }
    if (this.mouseUpSubscription) {
      this.mouseUpSubscription.unsubscribe();
      this.mouseUpSubscription = null;
    }
  }
  onMouseMove(event: MouseEvent) {
    this.mouseMove$.next(event);
    event.preventDefault();
    event.stopPropagation();
  }

}
