import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatMenuModule, MatInputModule, MatListModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatTooltipModule, MatDialogModule, MatCheckboxModule } from '@angular/material';
import { AppComponent } from './app.component';
import { CovalentLayoutModule, CovalentStepsModule, CovalentSearchModule, CovalentMenuModule, CovalentMediaModule, CovalentNotificationsModule, CovalentFileModule, CovalentDialogsModule } from '@covalent/core';
import { EmojiModule } from 'angular2-emoji';
import 'hammerjs';
import { StoreModule, combineReducers, ActionReducer } from "@ngrx/store";
import { AppState, APP_INITIAL_STATE } from './store/state';
import { UserReducer } from './store/userreducer';

const reducers = {
  userState: UserReducer
};

const combinedReducers: ActionReducer<AppState> = combineReducers(reducers);

export function appReducers(state: AppState = APP_INITIAL_STATE, action: any) {
  return combinedReducers(state, action);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule, MatButtonModule, MatMenuModule, MatInputModule, MatListModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatTooltipModule, MatDialogModule, MatCheckboxModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentSearchModule,
    CovalentDialogsModule,
    CovalentMenuModule,
    CovalentMediaModule,
    CovalentNotificationsModule,
    CovalentFileModule,
    EmojiModule,
    StoreModule.provideStore(appReducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
