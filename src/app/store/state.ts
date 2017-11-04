export interface UserState {
	loggedIn: boolean;
	userData: any;
}

export const USER_INITIAL_STATE: UserState = {
	loggedIn: false,
	userData: null
}

export interface AppState {
	userState: UserState
}

export const APP_INITIAL_STATE: AppState = {
	userState: USER_INITIAL_STATE
}