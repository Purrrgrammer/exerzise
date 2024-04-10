// userResponse when logged in
export interface extendedType extends userLoginResponse {
  data: loginResponse | string;
  _token: tokenResponse;
  payload: extendedType;
}
export interface serverResponseType {
  data: userLoginResponse;
  _token: string;
  success: boolean;
}

export interface loginResponse {
  data: userLoginResponse;
  _token: string | null;
  success: boolean;
}

export interface userLoginResponse {
  username: string;
  firstname: string;
  lastname: string;
  role: "coach" | "user" | undefined;
  userId: string;
  userImage: string;
  detail: string;
  phonenumber: string;
}
export interface tokenResponse {
  _token: string;
}
// SCHEDULE PAGE
export type bookingDataResponse = {
  bookingId: string; //backend
  date: string;
  day: number;
  price?: number; ////backend => database
  timeFrom: string;
  timeTo: string;
  session: string;
  typeTime?: string;
  userStatus?: string;
  coachStatus?: string;
  rating?: number;
  comment?: string;
  payment?: string;
  //coach data
  coachId: string | undefined;
  coachPhoneNumber: string;
  coachFirstName: string;
  coachLastName: string;
  coachImage: string;
  //user data
  userId: string | undefined;
  userPhoneNumber: string;
  userFirstName: string;
  userLastName: string;
  userImage: string;
};
export type forUserBookingType = {
  date: string;
  day: number;
  price?: number; ////backend => database
  timeFrom: string;
  timeTo: string;
  session: string;
  typeTime?: string;
  coachId: string | undefined;
  userId: string | undefined;
};

interface coachScheduleType {
  timeId: string;
  date: string;
  availableTime: string;
  endofavailableTime: string;
  price: string;
  user_id: string;
}

// for convert time
export type TimeRange = {
  startTime: string;
  endTime: string;
};

export type PriceRange = {
  start: string;
  end: string;
  price: number;
};

export type coachDataType = {
  userId: string;
  detail: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  role: string;
  session: string;
  userImage: string;
  username: string;
  bg?: string;
  averageRating: number;
  ratingCount: number;
};

export type updateCommentType = {
  bookingId: string;
  data: updateBookingReqType;
};

export type updateBookingReqType = {
  comment: string;
  rating: number;
};
export type reactPopupType = {
  show: boolean;
  thisBooking: string;
  bookingId: string;
  starValue: number | null | undefined;
  commentText: string | null | undefined;
  setStarValue: any;
  updateComment: any;
  setCommentText: any;
};
