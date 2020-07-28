import React, { useEffect } from "react";
import noloc from "./images/noloc.png";
import Dexie from "dexie";

function NoLoc(props) {
  useEffect(() => {
    const getData = async () => {
      let allData = await props.db.data.toArray();
      //  console.log('Check the length', allData.length);

      if (allData.length > 0) {
        props.history.push("/data");
      }
    };
    getData();
  }, []);
  return (
    <div
      className="container"
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={noloc} alt="Logo" style={{ height: "200px" }} />
      <h5 className="mt-2">Kindly Add Your Location First</h5>
      <p style={{ color: "#737375" }}>There is no location added right now</p>
    </div>
  );
}

export default NoLoc;
