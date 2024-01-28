import * as React from "react";
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
  setVal: any;
  val?: string;
}
export default function TimePickerValue({
  label,
  setVal,
}: TimePickerValueProps) {
  const [value, setValue] = React.useState<Dayjs | null>(
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
            return (
              setValue(newValue), setVal(newValue!.toString().slice(17, 22))
            );
          }}
          //   views={["hours", "minutes"]}
          //   format="hh:mm"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
