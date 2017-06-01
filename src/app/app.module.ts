import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ResizePanelDirective } from './resize-panel.directive';
import { ResizeHandleDirective } from './resize-handle.directive';

@NgModule({
  declarations: [
    AppComponent,
    ResizePanelDirective,
    ResizeHandleDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
