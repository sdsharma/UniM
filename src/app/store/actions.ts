export class ActionTypes {
	static LOGOUT:string = "LOGOUT";
	static LOGIN:string = "LOGIN";
	static LOGINPOST:string = "LOGINPOST";
}

export interface ObseverableAction {
	type: string,
	payload: any
}