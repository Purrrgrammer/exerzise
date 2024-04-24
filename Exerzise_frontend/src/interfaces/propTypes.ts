import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { CoachDataType, TimeSelectedType } from ".";

export interface StatusPopupPropsType {
  key: number;
  status: string;
  bookingId: string;
  // showStatus: boolean;
  // setShowStatus: Dispatch<SetStateAction<boolean>>;
}
export interface SearchBarPropsType {
  placeholder: string;
  handler?: ChangeEventHandler<HTMLInputElement>;
}
export interface SideBarPropsType {
  setContent: Dispatch<SetStateAction<string>>;
}
export interface CoachTimeContainerPropType {
  data: TimeSelectedType[]; // time
  header: string;
  fn: () => void;
  setTimeSelected: Dispatch<SetStateAction<TimeSelectedType[]>>;
}

export interface DayPickerPropType {
  setCurrentDay: Dispatch<SetStateAction<number>>;
  setDayAdded: Dispatch<SetStateAction<number>>;
  currentDay: number;
  currentDate: string;
}

export interface CommonBtnPropsType {
  placeholder: string;
  onClick?: () => void;
  // | React.ChangeEvent<HTMLInputElement>
  // | FormEvent<HTMLInputElement>;
}

export interface CoachCardProps {
  coachData: CoachDataType[] | undefined;
}

export interface FilterBarPropType {
  filterState: string;
  setFilterState: Dispatch<SetStateAction<string>>;
}

export interface PageHeaderCoverPropType {
  header: string;
  background: string;
}
export interface JustAButtonPropType {
  name: string;
}
export interface Formprops {
  setPageState: React.Dispatch<React.SetStateAction<string>>;
  pageState: string;
  name: string;
}
