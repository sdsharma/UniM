export class ActionTypes {
	static LOGOUT:string = "LOGOUT";
	static LOGIN:string = "LOGIN";
	static LOGINPOST:string = "LOGINPOST";
	static REGISTER:string = "REGISTER";
}

export interface ObseverableAction {
	type: string,
	payload: any
}