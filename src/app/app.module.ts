import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrashComponent } from './car-crash/car-crash.component';
import { CrashDetailComponent } from './car-crash/details/details.component';
import { ToDate } from './pipes/to-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CrashComponent,
    CrashDetailComponent,
    ToDate,
  ],
  exports: [ToDate],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
