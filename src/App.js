import React, { useState, useEffect } from "react";
import Navbar from "./components/NavbarComp";
import NoLoc from "./components/NoLoc";
import LocationData from "./components/LocationData";
import InputForm from "./components/InputForm";
import ModalSchedule from "./components/ModalSchedule";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Dexie from "dexie";
import UpdateInputForm from "./components/UpdateInputForm";

function App() {
  const db = new Dexie("ReactFormData");
  db.version(1).stores({
    data:
      "id, locationName, AddOne, suiteNo, AddTwo, city, state, zipCode, phoneNo, timeZone, appointmentPool, facilityTimings",
    tempData: "id, locationName, AddOne, suiteNo, AddTwo, city, state, zipCode, phoneNo, timeZone, appointmentPool, facilityTimings"
  });
  db.open().catch((err) => {
    console.log(err.stack || err);
  });

  // const [schDataObj, setSchDataObj] = useState([]);

  // const handleSchDataObj = (data) => {
  //   setSchDataObj(data);
  //   console.log("Copied Data: ", schDataObj);
  // };
  return (
    <Provider store={store}>
      <div className="App" style={{ height: "100vh" }}>
        <Navbar />

        <Switch>
          <Route path="/" render={props => <NoLoc db={db} {...props} />} exact />
          <Route path="/data" render={props => <LocationData db={db} {...props} />} />
          <Route path="/form" render={props => <InputForm db={db} {...props} />} />
          <Route path="/updateform" render={props => <UpdateInputForm db={db} {...props} />} />
          {/* <Route path="/schedule" component={ModalSchedule} /> */}
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
