import React, { useState, useEffect } from "react";

const ToggleTest = ({ setAmpm, usrInpt }) => {
  const [val, setVal] = useState(setAmpm);

  useEffect(() => {
    setVal(setAmpm);

    // setTimeout(
    //   () => {
    //     setHi('Hi There ');

    //     console.log('Data: ', hi)},
    //   3000
    // );
  }, [setAmpm]);

  return (
    <div
      className="d-flex border rounded"
      onClick={() => {
        let input;

        if (val == "am") {
          setVal("pm");
          usrInpt("pm");
        } else {
          setVal("am");
          usrInpt("am");
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <div
        className="px-3 py-1 rounded-left"
        style={
          val == "am"
            ? {
                backgroundColor: "#276191",
                color: "white",
                fontWeight: "400",
              }
            : {
                backgroundColor: "#E4E4E4",
                color: "#3B3B3B",
                fontWeight: "400",
              }
        }
      >
        AM
      </div>
      <div
        className="px-3 py-1 rounded-right"
        style={
          val == "pm"
            ? {
                backgroundColor: "#276191",
                color: "white",
                fontWeight: "400",
              }
            : {
                backgroundColor: "#E4E4E4",
                color: "#3B3B3B",
                fontWeight: "400",
              }
        }
      >
        PM
      </div>
    </div>
  );
};

export default ToggleTest;
