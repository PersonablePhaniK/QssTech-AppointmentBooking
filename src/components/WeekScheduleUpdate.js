import React, { useState, useEffect } from "react";
import TimeInput from "./TimeInput";
import ToggleTest from "./ToggleTest";
// import './WeekSchedule.css';

const WeekScheduleUpdate = ({
  week,
  setFacility,
  facility,
  applyToAll,
  applyData,
  inputForm,
}) => {
  const [data, setData] = useState({
    weekName: week,
    isChecked: false,
    scheduleFrom: "10:30",
    ampmFrom: "am",
    scheduleTo: "06:30",
    ampmTo: "pm",
  });
  const [hi, setHi] = useState("");

  const checkInp = (e) => {
    setData({
      ...data,
      isChecked: !data.isChecked,
    });
  };

  const timeInputFrom = (i) => {
    setData({
      ...data,
      scheduleFrom: i,
    });
  };
  const timeInputTo = (i) => {
    setData({
      ...data,
      scheduleTo: i,
    });
  };

  const ampmInputFrom = (i) => {
    setData({
      ...data,
      ampmFrom: i,
    });
  };

  const ampmInputTo = (i) => {
    setData({
      ...data,
      ampmTo: i,
    });
  };

  const updateObj = () => {
    setFacility([...facility, data]);
  };

  useEffect(() => {
    for (let i of applyData) {
      if (i.weekName == week) {
        setData({ ...i });
      }

      // console.log('I data: ', week)
    }
  }, [applyData]);

  useEffect(() => {
    // inputForm
    // console.log("Schedule Data: ", inputForm);
    const setSchedule = () => {
      inputForm.facilityTimings.map((i) => {
        if (i.weekName == week) {
          // console.log("I - 1: ", i);

          setTimeout(() => {
            setData({ ...i });

            // console.log("I - 2: ", i);
          }, 3000);
        }
      });
    };

    setSchedule();
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around" }}
      className="mt-4 mr-0"
      onBlur={updateObj}
      onMouseLeave={updateObj}
    >
      <div
        className="pt-1"
        style={{ width: "6%", cursor: "pointer" }}
        onBlur={updateObj}
      >
        <input
          type="checkbox"
          name={week}
          id={week}
          className="mr-2"
          checked={data.isChecked}
          onChange={checkInp}
        />
        <label htmlFor={week}>{week}</label>
      </div>
      <div className="ml-5" style={{ width: "8%" }}>
        <TimeInput
          usrInpt={timeInputFrom}
          intVal={data.scheduleFrom}
          onBlur={updateObj}
        />
      </div>
      <div style={{ width: "10.3%" }} onMouseLeave={updateObj}>
        <ToggleTest
          setAmpm={data.ampmFrom}
          usrInpt={ampmInputFrom}
          onBlur={updateObj}
        />
      </div>
      <div className="ml-5" style={{ width: "8%" }}>
        <TimeInput
          usrInpt={timeInputTo}
          intVal={data.scheduleTo}
          onBlur={updateObj}
        />
      </div>
      <div style={{ width: "10.3%" }} onMouseLeave={updateObj}>
        <ToggleTest
          setAmpm={data.ampmTo}
          usrInpt={ampmInputTo}
          onBlur={updateObj}
        />
      </div>
      <div
        className="ml-5 pt-1 px-2 rounded"
        style={{ border: "1px solid #276191", cursor: "pointer" }}
        onClick={() => applyToAll(data.weekName)}
      >
        Apply to All Checked
      </div>
    </div>
  );
};

export default React.memo(WeekScheduleUpdate);
