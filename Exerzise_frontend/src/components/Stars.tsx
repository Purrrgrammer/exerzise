import * as React from "react";
import Rating from "@mui/material/Rating";

export default function HalfRating() {
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <div>
      <Rating
        name="simple-controlled"
        size="large"
        defaultValue={2.5}
        precision={0.5}
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          setValue(newValue);
        }}
        readOnly
      />
    </div>
  );
}

{
  /* style={{"marginBottom: 2rem; fontFamily: sans-serif; font-size:0.9rem"}} */
}
