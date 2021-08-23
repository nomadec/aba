import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

let datePickerTheme;
const copyTheme = makeStyles((theme) => {
  datePickerTheme = createTheme({
    ...theme,
  });
});

const DateSelect = ({ label, minWidth, maxWidth }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  copyTheme();
  datePickerTheme.palette.secondary.main = "#A8C1D3";

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <ThemeProvider theme={datePickerTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          style={{ minWidth, maxWidth }}
          disableToolbar
          disablePast
          variant="inline"
          // inputVariant="outlined"
          format="MM/dd/yyyy"
          // height={48}
          // margin="normal"
          label={label}
          // value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
            color: "secondary",
          }}
          rightArrowButtonProps={{
            color: "secondary",
          }}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default DateSelect;
