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

  function renderCalendarInfo() {
    return (
      <div style={{ width: "100%" }}>
        <div style={{ width: "50%", margin: "auto" }}>
          <div onClick={(e) => setTime(e.target.innerText)}>11:15</div>
          <div>11:30</div>
          <div>11:45</div>
          <div>12:00</div>
        </div>
      </div>
    );
  }

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
      <button onClick={() => setFormClosed(false)}>Check Calendar</button>
      {formClosed ? null : (
        <div>
          <h4>Calendar</h4>
          <div>
            <SingleDatePicker
              id="appointment_date"
              placeholder="Select a date from calendar"
              date={date}
              initialDate={date}
              displayFormat="DD-MMM-YYYY"
              numberOfMonths={1}
              onDateChange={handleDateSelection}
              // onDayClick={handleDateSelection}
              focused={calendarOpen}
              openDirection="down"
              onFocusChange={({ focused }) => setCalendarOpen(focused)}
              calendarInfoPosition="bottom"
              renderCalendarInfo={renderCalendarInfo}
              hideKeyboardShortcutsPanel
              firstDayOfWeek={1}
              onClose={handleCalendarOnClose}
              // keepOpenOnDateSelect
              // navPrev={<TestPrevIcon />}
              // navNext={<TestNextIcon />}
              // renderDayContents={renderDayContents}
              isDayBlocked={isDayBlocked}
            />
          </div>

          <button onClick={handleBookNow}>Book Now</button>
        </div>
      )}
    </div>
  );
};

export default AppointmentBookingForm;
