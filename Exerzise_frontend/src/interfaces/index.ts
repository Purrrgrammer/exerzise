import { MutableRefObject } from "react";

// userResponse when logged in
export interface ExtendType extends UserLoginResponse {
  data: LoginResponse;
  _token: TokenResponse;
  payload: ExtendType;
}
export interface ServerResponseType {
  data: UserLoginResponse;
  _token: string;
  success: boolean;
  message: string;
}
export interface PostBookingPayloadType {
  userId: string;
  coachId: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  day: number;
  session: string | null;
  price: number;
  userStatus: string;
  coachStatus: string;
  rating: null;
  comment: null;
  payment: null;
  typetime: 30;
}

export interface InputFromType {
  id: string;
  placeholder: string;
  type: string | undefined;
  label: string;
  formValue: FormArrType;
  setFormvalue: React.Dispatch<React.SetStateAction<FormArrType>>;
  inputRef?:
    | string
    | MutableRefObject<
        MutableRefObject<HTMLInputElement | undefined> | undefined
      >;
}
export interface LoginResponse {
  data: UserLoginResponse;
  _token: string | null;
  success: boolean;
}
export interface RegisterFormValueType {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}
export interface FormArrType {
  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phonenumber?: string;
  role?: string;
}
export interface LoginFormValueType {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  role?: string;
  initial?: string;
}
export interface UserLoginResponse {
  username: string;
  firstname: string;
  lastname: string;
  role: "coach" | "user" | undefined;
  userId: string;
  userImage: string;
  detail: string;
  phonenumber: string;
}

export interface TokenResponseType {
  token: string | null;
}

export interface CoachDataType {
  userId: string;
  username: string;
  detail: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  role: string;
  session: string;
  userImage: string;
  rating: number;
  averageRating: number;
  ratingCount: number;
  bg?: string;
}
export interface TokenResponse {
  _token: string;
}
// SCHEDULE PAGE

export interface BookingDataResponse {
  length: number;
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
  coachName: string;
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
  status: string;
}
export interface ForUserBookingType {
  date: string;
  day: number;
  price?: number; ////backend => database
  timeFrom: string;
  timeTo: string;
  session: string;
  typeTime?: string;
  coachId: string | undefined;
  userId: string | undefined;
}

// for convert time
export interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface PriceRange {
  start: string;
  end: string;
  price: number;
}

export interface UpdateCommentType {
  bookingId: string;
  data: UpdateBookingReqType;
}

export interface UpdateBookingReqType {
  comment: string;
  rating: number;
}

export interface TimeSelectedType {
  day: number;
  date: string;
  availableTime: string;
  endofAvailableTime: string;
}
export interface CoachTimeResponse {
  timeId: string;
  coachId: string;
  day: number;
  date: string;
  availableTime: string;
  endOfAvailableTime: string;
  price: number;
}

export interface FormValueType {
  name: string;
  label: string;
  placeholder: string;
  type: string;
}
export interface StyledComponentInput {
  id: string;
  placeholder: string;
  type: string;
  label: string;
  inputRef: boolean;
  formValue: FormValueType;
  setFormvalue: React.Dispatch<React.SetStateAction<string>>;
}
export interface BlogType {
  header: string;
  author: string;
  date: string;
  category: string;
  content: string;
}

export interface BlogProps {
  data: BlogType[];
}
