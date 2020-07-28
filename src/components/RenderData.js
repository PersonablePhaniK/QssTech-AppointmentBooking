import React from "react";
import {Link } from 'react-router-dom';

const RenderData = (props) => {
    const deleteData = async(id) => {
        console.log('Deletion ID: ', id);
        props.db.data.delete(id);

        let allData = await props.db.data.toArray();
        props.setPosts(allData);
    }

    const updateData = () => {
        props.db.tempData.add(props.post);
        // props.history.push('/updateform')
    }
  return (
    <div
      className="mx-auto mb-3 pt-2"
      style={{
        maxWidth: "98%",
        backgroundColor: "white",
        borderRadius: "50px 50px 50px 50px",
        boxShadow: "3px 3px 3px 3px #D5D6D8",

        display: "flex",
        color: "#696866",
      }}
    >
        {/* <h6 style={{width: '4%'}}></h6>
        <h6 style={{width: '18%'}}>Location Name</h6>
        <h6 style={{width: '35%'}}>Address</h6>
        <h6 style={{width: '33%'}}>Phone No.</h6>
        <h6 style={{width: '4%'}}></h6>
        <h6 style={{width: '4%'}}></h6> */}
      <h6
        
        style={{
          fontWeight: "normal",
          backgroundColor: "#2D5D8B",
          color: "white",
          borderRadius: "50px",
          marginRight: '2%',
          marginLeft: '1%',
          padding: '2px 8px'
        }}
      >
        {props.index + 1}
      </h6>
      <h6 style={{ fontWeight: "normal", width: '18%' }}>
        {props.post.locationName}
      </h6>
      <h6 style={{ fontWeight: "normal", width: '35%' }}>
        {props.post.AddOne} 
      </h6>
      <h6 style={{ fontWeight: "normal", width: '33%' }}>
        {props.post.phoneNo}
      </h6>
      <Link className="ml-auto mr-4" style={{cursor: "pointer"}} onClick={() => updateData()} to="/updateform">
        <i className="fa fa-pencil" style={{ color: "#FEB630" }}></i>
      </Link>
      <h6 className="mr-4" onClick={() => deleteData(props.post.id)} style={{cursor: "pointer"}}>
        <i className="fa fa-trash" style={{ color: "#EF7262" }}></i>
      </h6>
    </div>
  );
};

export default RenderData;
