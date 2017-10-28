import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatMenuModule, MatInputModule, MatListModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { AppComponent } from './app.component';
import { CovalentLayoutModule, CovalentStepsModule, CovalentSearchModule, CovalentMenuModule, CovalentMediaModule, CovalentNotificationsModule, CovalentFileModule } from '@covalent/core';
import { EmojiModule } from 'angular2-emoji';


import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule, MatButtonModule, MatMenuModule, MatInputModule, MatListModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatTooltipModule, MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentSearchModule,
    CovalentMenuModule,
    CovalentMediaModule,
    CovalentNotificationsModule,
    CovalentFileModule,
    EmojiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
