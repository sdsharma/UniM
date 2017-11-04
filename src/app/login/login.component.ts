import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, UserState } from '../store/state';
import { ActionTypes } from '../store/actions';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { TdDialogService } from '@covalent/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn:boolean = false;

  constructor(private store: Store<AppState>, private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef, private router: Router) { }

  model: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  newUserModel: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  ngOnInit() {
  	this.store.select((state: AppState) => {
        return state.userState;
    }).subscribe((userState: UserState) => {
        this.loggedIn = userState.loggedIn;
        if(this.loggedIn == true){
          this.router.navigate(['messages']);
        }
    });
  }

  
  login(): void {
    if(this.model.valid){
      this.store.dispatch({ type: ActionTypes.LOGINPOST, payload: {username: <string>this.model.value.username, password: <string>this.model.value.password} });
    } else if(this.newUserModel.valid){

    }
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
}