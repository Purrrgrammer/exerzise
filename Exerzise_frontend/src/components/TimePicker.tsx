import React, { Dispatch, SetStateAction } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

interface TimePickerValueProps {
  label: string;
  val?: string;
  setVal: React.SetStateAction<string> | Dispatch<SetStateAction<string>> | any;
}
export default function TimePickerValue({
  label,
  setVal,
}: TimePickerValueProps) {
  const [value, _setValue] = React.useState<Dayjs | null>(
    dayjs.utc("2022-04-17T15:30:00+00:00")
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        {/* <DemoContainer components={["TimePicker", "TimePicker"]}> */}
        <TimePicker
          ampm={false}
          timeSteps={{ minutes: 30 }}
          label={label}
          value={value}
          onChange={(newValue) => {
            if (newValue) {
              return setVal(newValue.toString().slice(17, 22));
            }
            // original => setValue(newValue), setVal(newValue.toString().slice(17, 22))
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
