import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatMenuModule, MatInputModule, MatListModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatTooltipModule, MatDialogModule, MatCheckboxModule, MatSlideToggleModule, MatChipsModule } from '@angular/material';
import { AppComponent } from './app.component';
import { CovalentLayoutModule, CovalentStepsModule, CovalentSearchModule, CovalentMenuModule, CovalentMediaModule, CovalentNotificationsModule, CovalentFileModule, CovalentDialogsModule } from '@covalent/core';
import { EmojiModule } from 'angular2-emoji';
import 'hammerjs';
import { StoreModule, combineReducers, ActionReducer } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { AppState, APP_INITIAL_STATE } from './store/state';
import { UserReducer } from './store/userreducer';
import { appEffects } from './store/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from "./messages/messages.component";
import { LoginComponent } from "./login/login.component";
import { ROUTING } from "./app.routing";
import { AccessControlGuard } from './shared/guards/accesscontrol.service';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {MatRadioModule} from '@angular/material';

const reducers = {
  userState: UserReducer
};

const effects = [
  EffectsModule.run(appEffects)
];

const combinedReducers: ActionReducer<AppState> = combineReducers(reducers);

export function appReducers(state: AppState = APP_INITIAL_STATE, action: any) {
  return combinedReducers(state, action);
}

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule, MatButtonModule, MatMenuModule, MatInputModule, MatListModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatTooltipModule, MatDialogModule, MatCheckboxModule, MatSlideToggleModule, MatChipsModule,
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
    StoreModule.provideStore(appReducers),
    effects,
    ROUTING,
    ReactiveFormsModule,
    FilterPipeModule,
    MatRadioModule
  ],
  providers: [AccessControlGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
