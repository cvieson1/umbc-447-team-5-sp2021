import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerButton = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        todayButton="Click for Today"
        selected={startDate}
        onChange={date => setStartDate(date)}
      />
    );
};

export default DatePickerButton;