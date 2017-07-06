import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HorizontalSliderComponent } from './horizontal-slider/horizontal-slider.component';
import { VerticalSliderComponent } from './vertical-slider/vertical-slider.component';
import { ResizeHandleDirective } from './resize-handle.directive';
import { ResizePanelDirective } from './resize-panel.directive';

@NgModule({
  declarations: [
    ResizePanelDirective,
    ResizeHandleDirective,
    HorizontalSliderComponent,
    VerticalSliderComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    HorizontalSliderComponent,
    VerticalSliderComponent]
})
export class SliderModule { }
