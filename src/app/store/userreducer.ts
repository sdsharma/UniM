import { ActionReducer, Action } from "@ngrx/store";
import { UserState, USER_INITIAL_STATE } from './state';
import { ActionTypes } from "./actions";

export function UserReducer(state: UserState = USER_INITIAL_STATE, action: Action) {
    // clones object for modification and return
    const newState: UserState = Object.assign({}, state);
    switch (action.type) {
       	case ActionTypes.LOGIN:
       		newState.loggedIn = true;
       		return newState;
       	case ActionTypes.LOGOUT:
       		newState.loggedIn = false;
       		return newState;
        default:
          return state;
    }
};