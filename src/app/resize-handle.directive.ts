import { Directive, ElementRef, HostListener, OnInit, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';

@Directive({
  selector: '[resize-handle]'
})
export class ResizeHandleDirective {

  private mouseDown: boolean = false;
  private width: number;
  private height: number;
  private mouseUpSubscription: Subscription;
  private mouseMoveSubscription: Subscription;
  public mouseMove$: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  public mouseDown$: EventEmitter<string> = new EventEmitter<string>();
  constructor(private element: ElementRef) { }

  @HostListener('click') onClick() {
    this.mouseDown$.next('click');
  }

  @HostListener('mousedown') onMouseDown() {
    this.unsubscribeFromEvent();
    this.mouseMoveSubscription = Observable.fromEvent(document, 'mousemove').subscribe((event: MouseEvent) => this.onMouseMove(event));
    this.mouseUpSubscription = Observable.fromEvent(document, 'mouseup').subscribe((event) => this.onMouseUp(event));
  }
  onMouseUp(event) {
    event.preventDefault();
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
  topRightResize(offsetX: number, offsetY: number) {
  }

}
