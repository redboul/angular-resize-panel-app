import { Output, Input, EventEmitter, Directive, ElementRef, ContentChildren, AfterViewInit, QueryList } from '@angular/core';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { eventTypes } from './event-types';
import { ResizeHandleDirective } from './resize-handle.directive';

@Directive({
  selector: '[resize-panel]'
})
export class ResizePanelDirective implements AfterViewInit {

  @Input('resize-panel') private direction: string;
  @Input() private minSize = 60;
  @Output() handleClick = new EventEmitter<any>();
  private height = 0;
  private width = 0;
  private originalWidth = 0;
  private originalHeight = 0;

  @ContentChildren(ResizeHandleDirective)
  private resizeHandles: QueryList<ResizeHandleDirective>;
  private resizeHandle: ResizeHandleDirective;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.direction = this.direction || 'x';
    this.height = this.originalHeight = this.el.nativeElement.offsetHeight;
    this.width = this.originalWidth = this.el.nativeElement.offsetWidth;
    this.resizeHandles.forEach((handle: ResizeHandleDirective) => {
      handle.mouseMove$.subscribe(mouseEvent => this.increaseSize(mouseEvent));
      handle.mouseDown$
        .subscribe((event) => this.handleClick.next({ width: this.originalWidth }));
    });
  }

  togglePanel() {
    if (this.direction === 'x') {
      if (this.el.nativeElement.offsetWidth <= this.minSize) {
        this.el.nativeElement.style.width = this.originalWidth + 'px';
      } else {
        this.el.nativeElement.style.width = this.minSize + 'px';
      }
    } else if (this.direction === 'y') {
      if (this.el.nativeElement.offsetHeight <= this.minSize) {
        this.el.nativeElement.style.Height = this.originalHeight + 'px';
      } else {
        this.el.nativeElement.style.height = this.minSize + 'px';
      }
    }
  }

  increaseSize(event: MouseEvent) {
    this.handleClick.next({ type: eventTypes.cancel });
    if (this.direction === 'x') {
      this.el.nativeElement.style.width = (this.el.nativeElement.offsetWidth - event.movementX) + 'px';
    } else if (this.direction === 'y') {
      this.el.nativeElement.style.width = (this.el.nativeElement.offsetHeight - event.movementY) + 'px';
    }
  }
}
