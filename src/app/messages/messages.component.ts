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
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Angulartics2 } from 'angulartics2';

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
  newLabels: any[] = [];
  searchTerm: any = {message: ''};
  currentView: string = "Dhruhin Kurli";
  currentPlatform: string = "WhatsApp";
  searchRecipients: string = '';
  currentImage: number = 0;
  currentList: number = 1;
  messageText: string = '';
  showNew: boolean = false;
  selectedNewLabels: string[] = [];

  firstUsers:string[] = ["Dhruhin Kurli", "Jasmin Zieman"];
  secondUsers:string[] = ["Lilian Derose","Brendan Gulley", "Roxie Hage", "Maurita Wohlwend", "Belen Dalzell"];
  thirdUsers:string[] = ["Gabrielle Newson", "Jenna Mclellan", "Tonya Dominick", "Joselyn Albritton", "Darcie Mayton", "Lilly Beller","Buford Moor"];
  randomwords:string[] = ["Lyricalness", "Supersanguine","Obeyingly","Zygomatic","Nonconfirming","Bombproof","Proinvestment","Grime","Swerve","Quebrada","Botanomancy","Klister","Hackeries","Nondedication","Goriest","Unbreachable","Alternator","Abstemiousness","Incentive","Devouringness"];
  options:string[] = [];
  myControl: FormControl = new FormControl('');
  filteredOptions: Observable<string[]>;
  messages:any[] = [{message: "Hey there", user: true}, {message: "Whats up", user: false}, {message: "You know", user: true}, {message: "Gains?", user: false}, {message: "Those a fantastic", user: true}, {message: "Yes they are", user: false}, {message: "I like to workout 10x a week", user: true}, {message: "That's probably not good for you", user: false}, {message: "Oh its ok steroids help a lot", user: true}, {message: "That's not a good idea", user: false}, {message: "Yeah probably not", user: true}];
  constructor(private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService,
              private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer,
              private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef,
              private store: Store<AppState>,
              private router: Router,
              private angulartics2: Angulartics2) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.media.broadcast();
      this._changeDetectorRef.detectChanges();
    });

    setTimeout(() => {
      if(this.currentView != ''){
        this._dialogService.openConfirm({
          message: 'Move ' + this.currentView + ' to a higher priority?',
          disableClose: false,
          viewContainerRef: this._viewContainerRef,
          title: 'Change Priority',
          cancelButton: 'Cancel',
          acceptButton: 'Accept',
        }).afterClosed().subscribe((accept: boolean) => {});
      }
    }, 45000);
  }

  ngOnInit(): void {
    this.store.select((state: AppState) => {
        return state.userState;
    }).subscribe((userState: UserState) => {
        this.userData = userState.userData;
    });
    this.options = this.firstUsers.concat(this.secondUsers).concat(this.thirdUsers);
    this.filteredOptions = this.myControl.valueChanges
         .startWith(null)
         .map(val => val ? this.filter(val) : this.options.slice());
  }

  handleNewMessage(): void {
    if(this.showNew != true){
      this.showNew = true;
    }
    this.currentView = '';
    this.myControl.reset();
    setTimeout(()=>{
      document.getElementById('newMessage').focus();
    });
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
        this.newLabels.push({title: newValue, values: []});
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
    this.router.navigate(['/login']);
  }

  sendMessage(): void {
    if(this.messageText != ""){
      this.messages.push({message: this.messageText, user: true});
      this.messageText = "";
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

  changeLabel(e: any){
    if(e.value == "1"){
      if(this.secondUsers.indexOf(this.currentView) != -1){
        this.secondUsers.splice(this.secondUsers.indexOf(this.currentView), 1);
        this.firstUsers.push(this.currentView);
      }
      if(this.thirdUsers.indexOf(this.currentView) != -1){
        this.thirdUsers.splice(this.thirdUsers.indexOf(this.currentView), 1);
        this.firstUsers.push(this.currentView);
      }
      this.newLabels.forEach(label => {
        if(label.values.indexOf(this.currentView) != -1){
          label.values.splice(label.values.indexOf(this.currentView), 1);
          this.firstUsers.push(this.currentView);
        }
      });
    }
    else if(e.value == "2"){
      if(this.firstUsers.indexOf(this.currentView) != -1){
        this.firstUsers.splice(this.firstUsers.indexOf(this.currentView), 1);
        this.secondUsers.push(this.currentView);
      }
      if(this.thirdUsers.indexOf(this.currentView) != -1){
        this.thirdUsers.splice(this.thirdUsers.indexOf(this.currentView), 1);
        this.secondUsers.push(this.currentView);
      }
      this.newLabels.forEach(label => {
        if(label.values.indexOf(this.currentView) != -1){
          label.values.splice(label.values.indexOf(this.currentView), 1);
          this.secondUsers.push(this.currentView);
        }
      });
    }
    else if(e.value == "3"){
      if(this.firstUsers.indexOf(this.currentView) != -1){
        this.firstUsers.splice(this.firstUsers.indexOf(this.currentView), 1);
        this.thirdUsers.push(this.currentView);
      }
      if(this.secondUsers.indexOf(this.currentView) != -1){
        this.secondUsers.splice(this.secondUsers.indexOf(this.currentView), 1);
        this.thirdUsers.push(this.currentView);
      }
      this.newLabels.forEach(label => {
        if(label.values.indexOf(this.currentView) != -1){
          label.values.splice(label.values.indexOf(this.currentView), 1);
          this.thirdUsers.push(this.currentView);
        }
      });
    }
    else {
      if(this.firstUsers.indexOf(this.currentView) != -1){
        this.firstUsers.splice(this.firstUsers.indexOf(this.currentView), 1);
      }
      if(this.secondUsers.indexOf(this.currentView) != -1){
        this.secondUsers.splice(this.secondUsers.indexOf(this.currentView), 1);
      }
      if(this.thirdUsers.indexOf(this.currentView) != -1){
        this.thirdUsers.splice(this.thirdUsers.indexOf(this.currentView), 1);
      }
      this.newLabels.forEach(label => {
        if(label.values.indexOf(this.currentView) != -1){
          label.values.splice(label.values.indexOf(this.currentView), 1);
        }
      });
      this.newLabels[parseInt(e.value) - 4].values.push(this.currentView);
    }
  }

  filter(val: string): string[] {
      return this.options.filter(option =>
        option.toLowerCase().indexOf(val.toLowerCase()) === 0);
   }

  blurAuto(): void {
    setTimeout(()=> {
        this.currentView = this.myControl.value;
        this.showNew = false;
        for (let i = this.messages.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.messages[i], this.messages[j]] = [this.messages[j], this.messages[i]];
        }
    }, 300);
  }

  selectEvent(evt) {
    this.messageText = "📎 " + this.files.name;
    this.sendMessage();
  }

  newLabelSelect(evt){
    let index = this.selectedNewLabels.indexOf(evt.source.value);
    if(index > -1){
      this.selectedNewLabels.splice(index, 1);
    }
    else {
      this.selectedNewLabels.push(evt.source.value);
    }
  }

  arrContains(value) {
    let index = this.selectedNewLabels.indexOf(value);
    if (index == -1){
      return false;
    }
    return true;
  }

  smartToggle(evt){
    if(evt.checked){
      this.selectedNewLabels = [];
    }
  }

  hideSideMenu() {
    (<any>document.getElementsByClassName('mat-drawer-shown')[0]).click();
  }
}
