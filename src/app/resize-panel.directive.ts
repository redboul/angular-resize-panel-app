import { Input, Directive, ElementRef, ContentChildren, AfterViewInit, QueryList } from '@angular/core';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
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
      handle.mouseMove$.subscribe(mouseEvent => this.increaseSize(mouseEvent));
      handle.mouseDown$.do(() => console.log('click!'))
        .buffer(handle.mouseDown$.debounceTime(200))
        .filter(eventArray => eventArray.length > 1)
        .map(eventArray => eventArray[0]).subscribe(mouseEvent => this.togglePanel());
    });
  }

  togglePanel() {
    console.log('coucou');
    if (this.direction === 'x') {
      this.el.nativeElement.style.width = 0;
      this.el.nativeElement.style['min-width'] = 0;
    } else if (this.direction === 'y') {
      this.el.nativeElement.style.height = 0;
      this.el.nativeElement.style['min-height'] = 0;
    }
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
