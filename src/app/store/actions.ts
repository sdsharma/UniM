export class ActionTypes {
	static LOGOUT:string = "LOGOUT";
	static LOGIN:string = "LOGIN";
}

export interface ObseverableAction {
	type: string,
	payload: any
}