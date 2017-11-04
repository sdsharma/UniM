import { Effect, Actions, toPayload } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import { Http, Response, Headers } from "@angular/http";
import { ObseverableAction, ActionTypes} from './actions';

const baseUrl = "https://unified-messenger.herokuapp.com/api/";

@Injectable()
export class appEffects {


    constructor(private action$: Actions, private _http: Http) {
    }

    @Effect() login$ = this.action$
        .ofType(ActionTypes.LOGINPOST)
        .map(toPayload)
        .switchMap(payload => {
            let requestContent = this.prepareRequest(payload);
            return <Observable<ObseverableAction>>this._http.post(
                baseUrl + "login",
                requestContent.content,
                { headers: requestContent.headers }
            )
        	.map(this.extractData)
            .catch(this.handleError)
            .switchMap(result => {
            	if(result) {
                    return Observable.of(<ObseverableAction>{
                        type: ActionTypes.LOGIN,
                        payload: result
                    });
            	}
        		return Observable.of(<ObseverableAction>{
                    type: ActionTypes.LOGOUT,
                    payload: null
                });
            	
            });
        });

    @Effect() register$ = this.action$
        .ofType(ActionTypes.REGISTER)
        .map(toPayload)
        .switchMap(payload => {
            let requestContent = this.prepareRequest(payload);
            return <Observable<ObseverableAction>>this._http.post(
                baseUrl + "register",
                requestContent.content,
                { headers: requestContent.headers }
            )
        	.map(this.extractData)
            .catch(this.handleError)
            .switchMap(result => {
            	if(result) {
                    return Observable.of(<ObseverableAction>{
                        type: ActionTypes.LOGIN,
                        payload: result
                    });
            	}
        		return Observable.of(<ObseverableAction>{
                    type: ActionTypes.LOGOUT,
                    payload: null
                });
            	
            });
        });


    private prepareRequest(payload: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let content = JSON.stringify(payload);
        return {
            headers: headers,
            content: content
        };
    }

    private extractData(resp: Response): any {
        let body = resp.json();
        return body;
    }

    private handleError(error: Response | any): any {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}