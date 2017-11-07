import { Component, AfterViewInit, ViewContainerRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { TdMediaService } from '@covalent/core';
import { TdDialogService } from '@covalent/core';
import { Store } from '@ngrx/store';
import { AppState, UserState } from '../store/state';
import { ActionTypes } from '../store/actions';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements AfterViewInit, OnInit {

  files: any;
  userData: any;
  smartMode: boolean = false;

  workFilter: boolean = false;
  homeFilter: boolean = false;
  importantFilter: boolean = false;
  newLabels: string[] = [];

  randusers:string[] =["John Jacobs", "Jasmin Zieman", "Lilian Derose","Brendan Gulley", "Roxie Hage", "Maurita Wohlwend", "Belen Dalzell", "Gabrielle Newson", "Jenna Mclellan", "Tonya Dominick", "Joselyn Albritton", "Darcie Mayton", "Lilly Beller","Buford Moor", "Michel Lookabaugh", "Mao Ardis", "Senaida Coughlan", "Pat Lowenstein",  "Rima Ackerson","Sally Arnone ", "Elwood Guyer" ];
  randomwords:string[] = ["Lyricalness", "Supersanguine","Obeyingly","Zygomatic","Nonconfirming","Bombproof","Proinvestment","Grime","Swerve","Quebrada","Botanomancy","Klister","Hackeries","Nondedication","Goriest","Unbreachable","Alternator","Abstemiousness","Incentive","Devouringness"];
  messages:string[] = ["Hey there", "Whats up", "You know", "Gains?", "Those a fantastic", "Yes they are", "I like to workout 10x a week", "That's probably not good for you", "Oh its ok steroids help a lot", "That's not a good idea", "Yeah probably not"];
  constructor(private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService,
              private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer,
              private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef,
              private store: Store<AppState>,
              private router: Router) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.media.broadcast();
      this._changeDetectorRef.detectChanges();
    });
  }

  ngOnInit(): void {
    this.store.select((state: AppState) => {
        return state.userState;
    }).subscribe((userState: UserState) => {
        this.userData = userState.userData;
    });
  }

  handleNewMessage(): void {
  	document.getElementById('messageInput').getElementsByTagName('input')[0].focus();
  }

  openPriorities(): void {
    this._dialogService.openPrompt({
      message: 'Create a new label from here',
      disableClose: false, 
      viewContainerRef: this._viewContainerRef,
      title: 'Add Label',
      value: '',
      cancelButton: 'Cancel',
      acceptButton: 'Add',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        this.newLabels.push(newValue);
      }
    });
  }

  modifyPriorities(): void {
  	this._dialogService.openConfirm({
      message: 'Modify priorities from here',
      disableClose: false,
      viewContainerRef: this._viewContainerRef,
      title: 'Modify Priority',
      cancelButton: 'Cancel',
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
    this.router.navigate(['login']);
  }

  sendMessage(evt): void {
    let msg = document.getElementById('messageInput').getElementsByTagName('input')[0].value;
    if(msg != ""){
      this.messages.push(msg);
      document.getElementById('messageInput').getElementsByTagName('input')[0].value = "";
    }
  }

  shuffleMessages():void {
    for (let i = this.messages.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this.messages[i], this.messages[j]] = [this.messages[j], this.messages[i]];
    }
  }

  openTab(url: string) {
    window.open(url, '_blank');
  }

}
