import { Component, AfterViewInit, ViewContainerRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { TdMediaService } from '@covalent/core';
import { TdDialogService } from '@covalent/core';
import { Store } from '@ngrx/store';
import { AppState, UserState } from './store/state';
import { ActionTypes } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit {

  files: any;

  loggedIn:boolean = false;

  constructor(public media: TdMediaService,
              private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer,
              private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef,
              private store: Store<AppState>) {
                
              this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
              this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent.svg'));

  }

  ngAfterViewInit(): void {
      this.media.broadcast();
  }

   ngOnInit() {
  	this.store.select((state: AppState) => {
        return state.userState;
    }).subscribe((userState: UserState) => {
        this.loggedIn = userState.loggedIn;
    });
  }

  handleNewMessage(): void {
  	document.getElementById('messageInput').getElementsByTagName('input')[0].focus();
  }

  openSettings(): void {
    this._dialogService.openConfirm({
      message: 'Edit services connected and logout from here',
      disableClose: false,
      viewContainerRef: this._viewContainerRef,
      title: 'Settings',
      cancelButton: 'Save',
      acceptButton: 'Logout'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.logout();
      } else {
        // DO SOMETHING ELSE
      }
    });
  }

  openPriorities(): void {
  	this._dialogService.openConfirm({
      message: 'Add priorities from here',
      disableClose: false,
      viewContainerRef: this._viewContainerRef,
      title: 'Add Priority',
      cancelButton: 'Canel',
      acceptButton: 'Save'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        // DO SOMETHING
      } else {
        // DO SOMETHING ELSE
      }
    });
  }

  modifyPriorities(): void {
  	this._dialogService.openConfirm({
      message: 'Modify priorities from here',
      disableClose: false,
      viewContainerRef: this._viewContainerRef,
      title: 'Modify Priority',
      cancelButton: 'Canel',
      acceptButton: 'Save'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        // DO SOMETHING
      } else {
        // DO SOMETHING ELSE
      }
    });
  }

  logout(): void {
  	this.store.dispatch({ type: ActionTypes.LOGOUT, payload: null });
  }

  login(): void {
  	this.store.dispatch({ type: ActionTypes.LOGIN, payload: null });
  }
}
