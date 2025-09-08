import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { RightSideComponent } from './right-side/right-side.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftSideComponent,
    RightSideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
