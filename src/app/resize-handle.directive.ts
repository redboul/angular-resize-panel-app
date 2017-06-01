import { Directive, ElementRef, HostListener, OnInit, EventEmitter } from '@angular/core';

@Directive({
  selector: '[resize-handle]'
})
export class ResizeHandleDirective {

  private mouseDown: boolean = false;
  private width: number;
  private height: number;
  public mouseMove$: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  public mouseDown$: EventEmitter<string> = new EventEmitter<string>();
  constructor(private element: ElementRef) { }

  @HostListener('click') onClick() {
    this.mouseDown$.next('click');
  }

  @HostListener('mousedown') onMouseDown() {
    this.mouseDown = true;
  }
  @HostListener('document:mouseup') onMouseUp() {
    console.log('mouseup!');
    this.mouseDown = false;
  }
  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.mouseDown) {
      console.log('mousemove!');
      this.mouseMove$.next(event);
      event.preventDefault();
      event.stopPropagation();
    }
  }
  topRightResize(offsetX: number, offsetY: number) {
  }

}
