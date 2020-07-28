import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { dataService } from "./dataService";
import ModalSchedule from "./ModalSchedule";
import { connect } from "react-redux";
import Dexie from "dexie";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";

// import _ from "lodash";
import "./ModalSchedule.css";
import WeekScheduleUpdate from "./WeekScheduleUpdate";

const customStyles = {
  content: {
    width: "52%",
    top: "10%",
    left: "20%",
    height: "70%",
  },
  overlay: {
    backgroundColor: "#B5B5B5",
  },
};

Modal.setAppElement("#root");

/**
 * uuidv4()
 */

const state = ["Delhi", "J&K", "UP", "AP", "Telangana"];

const timezone = ["GMT", "IST", "BST", "EDT", "PDT"];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const InputForm = (props) => {
  const [inputForm, setInputForm] = useState({
    id: "",
    locationName: "",
    AddOne: "",
    suiteNo: "",
    AddTwo: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNo: "",
    timeZone: "",
    appointmentPool: [],
    facilityTimings: [],
  });
  const [apntPool, setApntPool] = useState("");

  const classes = useStyles();

  const [facility, setFacility] = useState([]);
  const [applyData, setApplyData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  // const RemoveDuplicates = (array, key) => {
  //   return array.reduce((arr, item) => {
  //     const removed = arr.filter((i) => i[key] !== item[key]);
  //     return [...removed, item];
  //   }, []);
  // };

  const preProcess = () => {
    let Sun = [];
    let Mon = [];
    let Tue = [];
    let Wed = [];
    let Thur = [];
    let Fri = [];
    let Sat = [];

    for (let i of facility) {
      if (i.weekName == "Sun") {
        Sun.push(i);
      } else if (i.weekName == "Mon") {
        Mon.push(i);
      } else if (i.weekName == "Tue") {
        Tue.push(i);
      } else if (i.weekName == "Wed") {
        Wed.push(i);
      } else if (i.weekName == "Thur") {
        Thur.push(i);
      } else if (i.weekName == "Fri") {
        Fri.push(i);
      } else if (i.weekName == "Sat") {
        Sat.push(i);
      }
    }

    let newData = [
      Sun.length ? Sun[Sun.length - 1] : undefined,
      Mon.length ? Mon[Mon.length - 1] : undefined,
      Tue.length ? Tue[Tue.length - 1] : undefined,
      Wed.length ? Wed[Wed.length - 1] : undefined,
      Thur.length ? Thur[Thur.length - 1] : undefined,
      Fri.length ? Fri[Fri.length - 1] : undefined,
      Sat.length ? Sat[Sat.length - 1] : undefined,
    ];
    // let sortedArry = facility.sort((a,b) => (a.weekName < b.weekName) ? 1 : ((b.weekName < a.weekName) ? -1 : 0));
    // console.log('Sorted Array: ', sortedArry);

    // let newArray = RemoveDuplicates(sortedArry, 'weekName');

    let chkdAry = [];
    for (let i of newData) {
      if (i) {
        if (i.isChecked) {
          chkdAry.push(i);
        }
      }
    }

    // console.log("Chkd Arry: ", chkdAry);

    return chkdAry;
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    let data = preProcess();
    // console.log("Data return: ", data);
    /**
     * Check the error here
     */
    // handleshow(data);
    // console.log("Check the function: ", handleshow);
    setInputForm({
      ...inputForm,
      facilityTimings: data,
    });
    // props.fetchData(data);

    setModalIsOpen(false);
    // props.history.push("/form");
    // window.location.href="/form"
  };

  const applyToAll = (id) => {
    let chkdAry = preProcess();

    let applyObj = chkdAry.find((i) => i.weekName == id);

    // console.log("Apply Obj: ", applyObj);

    let replaceAry = [applyObj];

    for (let i of chkdAry) {
      if (i.weekName !== id) {
        i.scheduleFrom = applyObj.scheduleFrom;
        i.ampmFrom = applyObj.ampmFrom;
        i.scheduleTo = applyObj.scheduleTo;
        i.ampmTo = applyObj.ampmTo;
        replaceAry.push(i);
      }
    }

    /**
     * Need to check this as data is not getting stored in the state
     */
    setApplyData([...replaceAry]);
    setFacility([...replaceAry]);

    // setTimeout(function () {
    //   console.log("NewReplacedArray: ", applyData);
    // }, 3000);
  };

  const handleZoneSelection = (e) => {
    setInputForm({
      ...inputForm,
      timeZone: e.target.value,
    });
  };

  const handleStateSelection = (e) => {
    setInputForm({
      ...inputForm,
      state: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums.length < 10) {
      setInputForm({ ...inputForm, phoneNo: onlyNums });
    } else if (onlyNums.length === 10) {
      const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

      setInputForm({ ...inputForm, phoneNo: number });
    }
  };

  // const handleAppointmentPool = (e, i) => {
  //   setApntPool(e.target.value);
  //   processAppointmentPool(apntPool);
  // };

  const processAppointmentPool = (e) => {
    let data = e.target.value;
    const newObj = { ...inputForm, appointmentPool: data.split(",") };
    setInputForm(newObj);
  };

  const handleSubmit = () => {
    if (!inputForm.locationName) {
      alert("Error : LocationName is Required");
    } else {
      let dataObj = {
        id: inputForm.id,
        locationName: inputForm.locationName,
        AddOne: inputForm.AddOne,
        suiteNo: inputForm.suiteNo,
        AddTwo: inputForm.AddTwo,
        city: inputForm.city,
        state: inputForm.state,
        zipCode: inputForm.zipCode,
        phoneNo: inputForm.phoneNo,
        timeZone: inputForm.timeZone,
        appointmentPool: inputForm.appointmentPool,
        facilityTimings: inputForm.facilityTimings,
      };

      props.db.data.put(dataObj).then(async () => {
        let allObjs = await props.db.data.toArray();

        // console.log("DB data: ", allObjs);
      });

      setInputForm({
        locationName: "",
        AddOne: "",
        suiteNo: "",
        AddTwo: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNo: "",
        timeZone: "",
        appointmentPool: "",
        facilityTimings: "",
      });

      // console.log("Final Data: ", inputForm);
      props.db.tempData.delete(inputForm.id);

      props.history.push("/data");
      // props.history.push("/data");
    }
  };

  const handleLocationName = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setInputForm({ ...inputForm, [name]: val });
  };

  // const handleSchedule = () => {
  //   dataService.getData().subscribe(message => {
  //     console.log(message.value);
  //     });
  // }

  useEffect(() => {
    const getData = async () => {
      let allData = await props.db.tempData.toArray();
      // console.log("Check the length", allData);

      if (!allData.length) {
        props.history.push("/data");
      }
      allData.map((d) => {
        setInputForm({
          id: d.id,
          locationName: d.locationName,
          AddOne: d.AddOne,
          suiteNo: d.suiteNo,
          AddTwo: d.AddTwo,
          city: d.city,
          state: d.state,
          zipCode: d.zipCode,
          phoneNo: d.phoneNo,
          timeZone: d.timeZone,
          appointmentPool: d.appointmentPool,
          facilityTimings: d.facilityTimings,
        });
      });
      props.db.tempData.delete(inputForm.id);
    };
    getData();
  }, []);

  // const getSchedule = (data) => {
  //   setTimings(data);
  //   console.log("Data: ", timings);
  // };

  return (
    <div
      className="container mt-5 pt-2"
      style={{
        width: "45%",
        backgroundColor: "white",
        boxShadow: "3px 3px 10px 3px #CFCFD1",
        height: "52%",
      }}
    >
      <span style={{ color: "#425E6A", fontWeight: "600" }}>Add Locations</span>

      <form className={classes.root} noValidate autoComplete="off">
        <div className="pt-3">
          <TextField
            id="standard-helperText"
            label="Location Name"
            name="locationName"
            InputLabelProps={{
              shrink: true,
              style: { color: "#489DC8", fontSize: "20px" },
            }}
            style={{ width: "95%" }}
            value={inputForm.locationName}
            onChange={handleLocationName}
          />
        </div>
        <div>
          <TextField
            id="standard-helperText"
            label="Address Lane 1"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "46.5%" }}
            name="AddOne"
            value={inputForm.AddOne}
            onChange={handleLocationName}
          />
          <TextField
            id="standard-helperText"
            label="Suite No."
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "46.5%" }}
            name="suiteNo"
            value={inputForm.suiteNo}
            onChange={handleLocationName}
          />
        </div>
        <div className="mt-3">
          <TextField
            id="standard-helperText"
            label="Address Lane 2"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "46.5%" }}
            name="AddTwo"
            value={inputForm.AddTwo}
            onChange={handleLocationName}
          />

          <TextField
            id="standard-helperText"
            label="City"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "22.6%" }}
            name="city"
            value={inputForm.city}
            onChange={handleLocationName}
          />

          <TextField
            id="standard-helperText"
            select
            label="State"
            InputLabelProps={{
              shrink: true,
            }}
            value={inputForm.state}
            style={{ width: "22.6%" }}
            onChange={handleStateSelection}
          >
            {state.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="mt-3">
          <TextField
            id="standard-helperText"
            label="Zip Code"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "22.6%" }}
            inputProps={{ maxLength: 10 }}
            name="zipCode"
            value={inputForm.zipCode}
            onChange={handleLocationName}
          />

          <TextField
            id="standard-helperText"
            label="Phone Number"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "22.6%" }}
            onChange={handlePhoneChange}
            value={inputForm.phoneNo}
          />
          <TextField
            id="standard-helperText"
            select
            label="TimeZome"
            InputLabelProps={{
              shrink: true,
            }}
            value={inputForm.timeZone}
            style={{ width: "46.5%" }}
            onChange={handleZoneSelection}
          >
            {timezone.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="mt-3">
          <TextField
            id="standard-helperText"
            label="Facility Times"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "46.5%" }}
            onClick={() => setModalIsOpen(true)}
            placeholder="Click here to select Appointment.."
          />
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            shouldCloseOnOverlayClick={false}
            onRequestClose={() => setModalIsOpen(false)}
          >
            <form>
              <h5 style={{ color: "#537794" }}>Facility Times</h5>
              <div style={{ display: "flex" }} className="mt-5">
                <div style={{ width: "6%" }} className="ml-5 mr-2"></div>
                <div className="ml-5 mr-4" style={{ width: "8%" }}>
                  From
                </div>
                <div className="ml-5 mr-4" style={{ width: "10.3%" }}></div>
                <div className="ml-4" style={{ width: "8%" }}>
                  To
                </div>
                <div className="ml-1" style={{ width: "10.3%" }}></div>
                <div className="ml-5"></div>
              </div>
              {weeks.map((week) => (
                <WeekScheduleUpdate
                  week={week}
                  key={week}
                  setFacility={setFacility}
                  facility={facility}
                  applyToAll={applyToAll}
                  applyData={applyData}
                  inputForm={inputForm}
                />
              ))}

              <div className="mt-5 d-flex">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#FB6860",
                    color: "white",
                    textTransform: "none",
                  }}
                  className="ml-auto mr-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalIsOpen(false);
                    setFacility([]);
                    setApplyData([]);
                  }}
                >
                  Cancle
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#2B5F8E",
                    color: "white",
                    textTransform: "none",
                  }}
                  className="mr-3 px-4"
                  type="button"
                  onClick={handleSubmitModal}
                >
                  Save
                </Button>
                {/* <Link
              to="/form"
              style={{
                backgroundColor: "#2B5F8E",
                color: "white",
                textTransform: "none",
              }}
              className="mr-3 px-4 rounded"
              onClick={handleSubmit}
            >
              Save
            </Link> */}
              </div>
            </form>
          </Modal>
          <TextField
            id="standard-helperText"
            label="Appointment Pool"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "46.5%" }}
            onChange={processAppointmentPool}
            // onMouseLeave={processAppointmentPool}
            value={inputForm.appointmentPool}
          />
        </div>
        <div className="mt-3 d-flex">
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FB6860",
              color: "white",
              textTransform: "none",
            }}
            className="ml-auto mr-3"
            onClick={() => {
              props.db.tempData.delete(inputForm.id);
              props.history.push("/data");
            }}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#2B5F8E",
              color: "white",
              textTransform: "none",
            }}
            className="mr-3 px-4"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.dataObj.items,
});

export default connect(mapStateToProps)(InputForm);
