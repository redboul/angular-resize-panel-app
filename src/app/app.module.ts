import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HorizontalSliderComponent } from './horizontal-slider/horizontal-slider.component';
import { VerticalSliderComponent } from './vertical-slider/vertical-slider.component';
import { ResizeHandleDirective } from './resize-handle.directive';
import { ResizePanelDirective } from './resize-panel.directive';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ResizePanelDirective,
    ResizeHandleDirective,
    HorizontalSliderComponent,
    VerticalSliderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
