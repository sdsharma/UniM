export interface UserState {
	loggedIn: boolean;
}

export const USER_INITIAL_STATE: UserState = {
	loggedIn: false
}

export interface AppState {
	userState: UserState
}

export const APP_INITIAL_STATE: AppState = {
	userState: USER_INITIAL_STATE
}