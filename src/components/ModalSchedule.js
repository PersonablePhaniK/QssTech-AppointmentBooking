import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import "./ModalSchedule.css";
import WeekSchedule from "./WeekSchedule";
import { dataService } from "./dataService";
import { connect } from "react-redux";
import { fetchData } from "../actions/dataActions";

const customStyles = {
  content: {
    width: "52%",
    top: "10%",
    left: "20%",
    height: "70%",
  },
};

Modal.setAppElement("#root");

const ModalSchedule = (props, { handleshow }) => {
  const [facility, setFacility] = useState([]);
  const [applyData, setApplyData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(true);

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
    console.log("Data return: ", data);
    /**
     * Check the error here
     */
    // handleshow(data);
    // console.log("Check the function: ", handleshow);
    props.fetchData(data);

    setModalIsOpen(false);
    props.history.push("/form");
    // window.location.href="/form"
  };

  const applyToAll = (id) => {
    let chkdAry = preProcess();

    let applyObj = chkdAry.find((i) => i.weekName == id);

    console.log("Apply Obj: ", applyObj);

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

  return (
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
          <WeekSchedule
            week={week}
            key={week}
            setFacility={setFacility}
            facility={facility}
            applyToAll={applyToAll}
            applyData={applyData}
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
            onClick={() => {
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
            type="submit"
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
  );
};

export default connect(null, { fetchData })(ModalSchedule);
