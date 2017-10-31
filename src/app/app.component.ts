import { Component, AfterViewInit, ViewContainerRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { TdMediaService } from '@covalent/core';
import { TdDialogService } from '@covalent/core';
import { Store } from '@ngrx/store';
import { AppState, UserState } from './store/state';
import { ActionTypes } from './store/actions';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit, OnInit {

  files: any;

  loggedIn:boolean = false;

  randusers:string[] =["John Jacobs", "Jasmin Zieman", "Lilian Derose","Brendan Gulley", "Roxie Hage", "Maurita Wohlwend", "Belen Dalzell", "Gabrielle Newson", "Jenna Mclellan", "Tonya Dominick", "Joselyn Albritton", "Darcie Mayton", "Lilly Beller","Buford Moor", "Michel Lookabaugh", "Mao Ardis", "Senaida Coughlan", "Pat Lowenstein",  "Rima Ackerson","Sally Arnone ", "Elwood Guyer" ];
  randomwords:string[] = ["Lyricalness", "Supersanguine","Obeyingly","Zygomatic","Nonconfirming","Bombproof","Proinvestment","Grime","Swerve","Quebrada","Botanomancy","Klister","Hackeries","Nondedication","Goriest","Unbreachable","Alternator","Abstemiousness","Incentive","Devouringness"];
  messages:string[] = ["Hey there", "Whats up", "You know", "Gains?", "Those a fantastic", "Yes they are", "I like to workout 10x a week", "That's probably not good for you", "Oh its ok steroids help a lot", "That's not a good idea", "Yeah probably not"];
  model: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  newUserModel: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

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

  registerAccount(): void {
    this.model.reset();
  	this._dialogService.openConfirm({
      message: 'Register for an account here',
      disableClose: false,
      viewContainerRef: this._viewContainerRef,
      title: 'Register Account',
      cancelButton: 'Cancel',
      acceptButton: 'Register'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.login();
      } else {
        // DO SOMETHING ELSE
      }
    });
  }

  logout(): void {
  	this.store.dispatch({ type: ActionTypes.LOGOUT, payload: null });
  }

  login(): void {
    if(this.model.valid){
      this.store.dispatch({ type: ActionTypes.LOGINPOST, payload: {username: <string>this.model.value.username, password: <string>this.model.value.password} });
    } else if(this.newUserModel.valid){

    }
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
}
