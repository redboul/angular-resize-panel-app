import { Input, Directive, ElementRef, ContentChildren, AfterViewInit, QueryList } from '@angular/core';

import { ResizeHandleDirective } from './resize-handle.directive';

@Directive({
  selector: '[resize-panel]'
})
export class ResizePanelDirective implements AfterViewInit {

  @Input('resize-panel') private direction: string;
  private height: number = 0;
  private width: number = 0;

  @ContentChildren(ResizeHandleDirective)
  private resizeHandles: QueryList<ResizeHandleDirective>;
  private resizeHandle: ResizeHandleDirective;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.direction = this.direction || 'x';
    this.height = this.el.nativeElement.offsetHeight;
    this.width = this.el.nativeElement.offsetWidth;
    this.resizeHandles.forEach((handle: ResizeHandleDirective) => {
      handle.mouseMove.subscribe(mouseEvent => this.increaseSize(mouseEvent));
    });
  }

  increaseSize(event: MouseEvent) {
    if (this.direction === 'x') {
      this.width -= event.movementX;
      this.el.nativeElement.style.width = this.width + 'px';
    } else if (this.direction === 'y') {
      this.height -= event.movementY;
      this.el.nativeElement.style.height = this.height + 'px';
    }
  }
}
