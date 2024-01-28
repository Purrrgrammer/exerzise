// userResponse when logged in
export interface extendedType extends userResponse {
  data: loginResponse | string;
  _token: tokenResponse;
  payload: extendedType;
}
export interface serverResponseType {
  data: userResponse;
  _token: string;
  success: boolean;
}

export interface loginResponse {
  data: userResponse;
  _token: string | null;
  success: boolean;
}

export interface userResponse {
  username: string;
  firstName: string;
  lastName: string;
  role: "coach" | "user" | "non-user";
  userId: string;
  userImage: string | null;
  detail: string;
}
export interface tokenResponse {
  _token: string;
}
