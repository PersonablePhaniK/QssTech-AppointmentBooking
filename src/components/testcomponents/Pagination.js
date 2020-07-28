import React from "react";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {Select, MenuItem} from "@material-ui/core";



const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const PageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    PageNumbers.push(i);
  }

  return (
    <nav className="my-2" style={{ color: "#BEBEBE", fontSize: "15px" }}>
      {/* <ul className="pagination">
          
        {PageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul> */}
      Items per page:
      <span
        className="ml-3 mr-3"
        style={{ display: "inline-block", borderBottom: "1px  #949494" }}
      >
        
        <Select
          style={{
            border: "none",
            backgroundColor: "white",
            color: "#574261",
            fontSize: "13px",
            width: '60px'
          }}
          onChange={(e) => {
            paginate(e.target.value);
          }}
          value={postsPerPage}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          {PageNumbers.map((number) => (
            <MenuItem key={number} className="page-item" value={number}>
              {/* <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a> */}
              {number}
            </MenuItem>
          ))}
        </Select>
        {/* <Select
          name="pagination"
          id="pagination"
          style={{ border: "none", backgroundColor: "white", color: '#574261', fontSize: '13px' }}
          onChange={(e) => {
            paginate(e.target.value);
          }}
          value={postsPerPage}
        >
          {PageNumbers.map((number) => (
            <option key={number} className="page-item" value={number}>
              
              {number}
            </option>
          ))}
        </Select> */}
      </span>
      <span className="ml-3" style={{ color: "#BEBEBE" }}>
        {currentPage} - {currentPage} of {PageNumbers.length}
      </span>
      <FirstPageIcon className="ml-5 mr-2" style={{ color: "#BEBEBE" }} />
      <ChevronLeftIcon className="ml-2 mr-2" style={{ color: "#BEBEBE" }} />
      <ChevronRightIcon className="ml-2 mr-2" style={{ color: "#BEBEBE" }} />
      <LastPageIcon className="ml-2 mr-2" style={{ color: "#BEBEBE" }} />
    </nav>
  );
};

export default Pagination;
