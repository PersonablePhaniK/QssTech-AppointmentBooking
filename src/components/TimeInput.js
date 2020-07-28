import React, { useState, useEffect } from "react";

const TimeInput = ({usrInpt, intVal}) => {
  const [timeinput, setTimeInput] = useState(intVal);

  const timeTo12HrFormat = (time) => {
    // Take a time in 24 hour format and format it in 12 hour format
    const time_part_array = time.split(":");
    let ampm = "AM";

    if (time_part_array[0] >= 12) {
      ampm = "PM";
    }
    let formatted_time;

    if (time_part_array[0] > 12) {

      time_part_array[0] = time_part_array[0] - 12;

      if (time_part_array[0] < 10) {
        formatted_time = "0" + time_part_array[0] + ":" + time_part_array[1];
        return formatted_time
      }      
    }

    formatted_time = time_part_array[0] + ":" + time_part_array[1];

    return formatted_time;
  };

  const timeChangehandle = (e) => {
    setTimeInput(e.target.value);
  };

  const updateTime = () => {
    const hours = timeTo12HrFormat(timeinput);
    setTimeInput(hours);
    usrInpt(hours);
  };

  useEffect(() => {
    setTimeInput(intVal);
  }, [intVal])


  return (
    <input
      type="time"
      name="appt"
      className="pl-2"
      value={timeinput}
      style={{
        paddingBottom: "3px",
        paddingTop: "3px",
        borderRadius: "5px",
        border: "1px solid #CACACA",
        outline: "none",
      }}
      onChange={timeChangehandle}
      onBlur={updateTime}
    />
  );
};

export default React.memo(TimeInput);
