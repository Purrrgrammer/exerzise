import Rating from "@mui/material/Rating";
import { useState } from "react";

export default function HalfRating() {
  const [value, setValue] = useState<number | null>(2);

  return (
    <>
      <Rating
        name="simple-controlled"
        size="large"
        defaultValue={2.5}
        precision={0.5}
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        readOnly
      />
    </>
  );
}

{
}
