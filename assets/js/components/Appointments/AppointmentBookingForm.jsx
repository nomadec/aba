import React from "react";
import { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import {
  DateRangePicker,
  SingleDatePicker,
  // DayPicker,
  DayPickerRangeController,
  SingleDatePickerWrapper,
} from "react-dates";
import { useParams } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { Button, Chip, IconButton } from "@material-ui/core";

const AppointmentBookingForm = ({ service_id }) => {
  const { id } = useParams();
  const { createAppointment } = useData();
  const [formClosed, setFormClosed] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(moment());
  const [time, setTime] = useState(null);

  function handleDateSelection(date) {
    setDate(date);
    console.log(date);
  }

  function handleTimeSelection(e) {
    setTime(e.target.innerText);
  }

  const times = [
    { closed: false, time: "11:00" },
    { closed: true, time: "11:15" },
    { closed: true, time: "11:30" },
    { closed: false, time: "11:45" },
    { closed: false, time: "12:00" },
    { closed: false, time: "12:15" },
    { closed: true, time: "12:30" },
  ];

  // function renderCalendarInfo() {
  //   return (
  //     <div style={{ width: "100%" }}>
  //       <div style={{ width: "50%", margin: "auto" }}>
  //         <div onClick={handleTimeSelection}>11:15</div>
  //         <div onClick={handleTimeSelection}>11:30</div>
  //         <div onClick={handleTimeSelection}>11:45</div>
  //         <div onClick={handleTimeSelection}>12:00</div>
  //       </div>
  //     </div>
  //   );
  // }

  function handleCalendarOnClose(props) {
    console.log("handleCalendarOnClose", props);
  }

  function isDayBlocked(props) {
    console.log("isDayBlocked", props);
    return false;
  }

  function handleBookNow() {
    const form = {
      service_id: id,
      date_time: moment(date.format("ll") + " " + time),
    };
    createAppointment(form);
  }

  return (
    <div>
      {/* <button onClick={() => setFormClosed(false)}>Check Calendar</button> */}
      {formClosed ? null : (
        <div>
          <h4>Book your appointment</h4>
          <div className="appointment_datetime">
            <SingleDatePicker
              className="date_input"
              id="appointment_date"
              placeholder="Select a date from calendar"
              date={date}
              initialDate={date}
              displayFormat="DD-MMM-YYYY"
              numberOfMonths={1}
              onDateChange={handleDateSelection}
              // onDayClick={handleDateSelection}
              focused={calendarOpen}
              openDirection="up"
              onFocusChange={({ focused }) => setCalendarOpen(focused)}
              // calendarInfoPosition="bottom"
              // renderCalendarInfo={renderCalendarInfo}
              hideKeyboardShortcutsPanel
              firstDayOfWeek={1}
              onClose={handleCalendarOnClose}
              // keepOpenOnDateSelect
              // navPrev={<TestPrevIcon />}
              // navNext={<TestNextIcon />}
              // renderDayContents={renderDayContents}
              isDayBlocked={isDayBlocked}
            />
            <div className="time_input">
              <input type="text" value={time} disabled />
            </div>
          </div>

          <h4>Select desired Time</h4>
          <div className="calendar_hours">
            {times.map((window) => (
              <Chip
                color="primary"
                label={window.time}
                className="calendar_hours_block"
                disabled={window.closed ? true : false}
                onClick={handleTimeSelection}
              />
            ))}
          </div>

          <Button
            variant="contained"
            fullWidth
            onClick={handleBookNow}
            style={{
              margin: "15px 0",
              background: "linear-gradient(90deg, #fc466b 0%, #3f5efb 100%)",
            }}
          >
            Book Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentBookingForm;
