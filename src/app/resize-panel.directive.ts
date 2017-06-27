import { Output, Input, EventEmitter, Directive, ElementRef, ContentChildren, AfterViewInit, QueryList } from '@angular/core';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/debounceTime';
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

import { ResizeHandleDirective } from './resize-handle.directive';

@Directive({
  selector: '[resize-panel]'
})
export class ResizePanelDirective implements AfterViewInit {

  @Input('resize-panel') private direction: string;
  @Output() handleClick = new EventEmitter<any>();
  private height: number = 0;
  private width: number = 0;
  private originalWidth: number = 0;
  private formerHeight: number = 0;
  private formerWidth: number = 0;

  @ContentChildren(ResizeHandleDirective)
  private resizeHandles: QueryList<ResizeHandleDirective>;
  private resizeHandle: ResizeHandleDirective;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.direction = this.direction || 'x';
    this.height = this.el.nativeElement.offsetHeight;
    this.width = this.originalWidth = this.el.nativeElement.offsetWidth;
    this.resizeHandles.forEach((handle: ResizeHandleDirective) => {
      handle.mouseMove$.subscribe(mouseEvent => this.increaseSize(mouseEvent));
      handle.mouseDown$.do(() => console.log('click!'))
        .subscribe((event) => this.handleClick.next({ width: this.originalWidth }));
        /*.buffer(handle.mouseDown$.debounceTime(250))
        .filter(eventArray => eventArray.length > 1)
        .map(eventArray => eventArray[0])
        .subscribe(() => {
          this.handleClick.next(true);
        });*/
        //.subscribe(mouseEvent => this.togglePanel());
    });
  }

  togglePanel() {
    console.log('coucou');
    if (this.direction === 'x') {
      if (this.el.nativeElement.offsetWidth <= 30) {
        this.el.nativeElement.style.width = this.originalWidth + 'px';
        /*this.el.nativeElement.style.width = this.originalWidth + 'px';
        this.el.nativeElement.style['min-width'] = '';
        this.el.nativeElement.style['max-width'] = '';*/
      } else {
        //this.formerWidth = this.el.nativeElement.style.width;
        //this.el.nativeElement.style.width = 0;
        /*this.el.nativeElement.style['min-width'] = '6px';
        this.el.nativeElement.style['max-width'] = '0px';*/
        this.el.nativeElement.style.width = '30px';
      }
    } else if (this.direction === 'y') {
      this.el.nativeElement.style.height = 0;
      this.el.nativeElement.style['min-height'] = 0;
    }
  }

  increaseSize(event: MouseEvent) {
    this.handleClick.next({ type: 'cancelTransition' });
    if (this.direction === 'x') {
      // this.width -= event.movementX;
      this.el.nativeElement.style.width = (this.el.nativeElement.offsetWidth - event.movementX) + 'px';
    } else if (this.direction === 'y') {
      this.height -= event.movementY;
      this.el.nativeElement.style.height = this.height + 'px';
    }
  }
}
