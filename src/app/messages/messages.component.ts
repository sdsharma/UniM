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
  searchTerm: any = {message: ''};
  currentView: string = "Dhruhin Kurli";
  currentPlatform: string = "WhatsApp";
  searchRecipients: string = '';
  currentImage: number = 0;

  firstUsers:string[] = ["Dhruhin Kurli", "Jasmin Zieman"];
  secondUsers:string[] = ["Lilian Derose","Brendan Gulley", "Roxie Hage", "Maurita Wohlwend", "Belen Dalzell"];
  thirdUsers:string[] = ["Gabrielle Newson", "Jenna Mclellan", "Tonya Dominick", "Joselyn Albritton", "Darcie Mayton", "Lilly Beller","Buford Moor"];
  randomwords:string[] = ["Lyricalness", "Supersanguine","Obeyingly","Zygomatic","Nonconfirming","Bombproof","Proinvestment","Grime","Swerve","Quebrada","Botanomancy","Klister","Hackeries","Nondedication","Goriest","Unbreachable","Alternator","Abstemiousness","Incentive","Devouringness"];
  messages:any[] = [{message: "Hey there", user: true}, {message: "Whats up", user: false}, {message: "You know", user: true}, {message: "Gains?", user: false}, {message: "Those a fantastic", user: true}, {message: "Yes they are", user: false}, {message: "I like to workout 10x a week", user: true}, {message: "That's probably not good for you", user: false}, {message: "Oh its ok steroids help a lot", user: true}, {message: "That's not a good idea", user: false}, {message: "Yeah probably not", user: true}];
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

    setTimeout(() => {
      this._dialogService.openConfirm({
        message: 'Move ' + this.currentView + ' to a higher priority?',
        disableClose: false,
        viewContainerRef: this._viewContainerRef,
        title: 'Change Priority',
        cancelButton: 'Cancel',
        acceptButton: 'Accept',
      }).afterClosed().subscribe((accept: boolean) => {});
    }, 20000);
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

  openEdit(): void {
    this._dialogService.openPrompt({
      message: 'Edit your email',
      disableClose: false, 
      viewContainerRef: this._viewContainerRef,
      title: 'Change Email',
      value: this.userData.email,
      cancelButton: 'Cancel',
      acceptButton: 'Save',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        this.userData.email = newValue;
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
      this.messages.push({message: msg, user: true});
      document.getElementById('messageInput').getElementsByTagName('input')[0].value = "";
      setTimeout(() => {
        document.getElementById('messageList').lastElementChild.scrollIntoView(false);
      });
    }
  }

  shuffleMessages(name: string, index: number):void {
    if(this.currentView != name){
      this.currentView = name;
      this.currentImage = index;
      for (let i = this.messages.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [this.messages[i], this.messages[j]] = [this.messages[j], this.messages[i]];
      }
    }
  }

  switchPlatform(platform: string) {
    if(this.currentPlatform != platform){
      for (let i = this.messages.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [this.messages[i], this.messages[j]] = [this.messages[j], this.messages[i]];
      }
      this.currentPlatform = platform;
    }
  }

}
