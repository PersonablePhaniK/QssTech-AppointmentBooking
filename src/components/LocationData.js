import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./testcomponents/Posts";
import Pagination from "./testcomponents/Pagination";
import RenderData from "./RenderData";
import { sortBy } from "lodash";

const LocationData = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);

  const sortByLocation = () => {
    let obj = [...posts];
    obj.sort((a, b) => {
      var x = a.locationName.toLowerCase();
      var y = b.locationName.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });

    setPosts(obj);
  };

  const sortByPhoneNo = () => {
    let obj = [...posts];
    obj.sort((a, b) => {
      // const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      let x = parseInt(a.phoneNo.replace(/[^0-9,]+/g, ""));
      let y = parseInt(b.phoneNo.replace(/[^0-9,]+/g, ""));

      return x - y;
    });
    console.log("Sorted Obj: ", obj);

    setPosts(obj);
  };

  const sortByAddress = () => {
    let obj = [...posts];
    obj.sort((a, b) => {
      var x = a.AddOne.toLowerCase();
      var y = b.AddOne.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });

    setPosts(obj);
  };

  useEffect(() => {
    const getData = async () => {
      let allData = await props.db.data.toArray();
      console.log("Check the length", allData);

      if (!allData.length) {
        props.history.push("/");
      }

      setPosts(allData);
    };
    getData();
  }, []);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  //     setPosts(res.data);
  //     setLoading(false);
  //   };
  //   fetchPosts();
  // }, []);

  // Get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setPostsPerPage(pageNumber);

  return (
    <React.Fragment>
      <div
        className="mx-auto mb-3"
        style={{
          maxWidth: "98%",
          backgroundColor: "white",
          borderRadius: "50px",
          padding: "6px",
          boxShadow: "3px 3px 3px 3px #D5D6D8",
          display: "flex",
        }}
      >
        {/* <h6 className="ml-3 mr-5 pl-2 pr-2 pt-1 pb-1"></h6> */}
        <h6 style={{ width: "4%" }}></h6>
        <h6
          style={{ width: "18%", cursor: "pointer" }}
          onClick={sortByLocation}
        >
          Location Name
        </h6>
        <h6 style={{ width: "35%", cursor: "pointer" }} onClick={sortByAddress}>
          Address
        </h6>
        <h6 style={{ width: "33%", cursor: "pointer" }} onClick={sortByPhoneNo}>
          Phone No.
        </h6>
        <h6 style={{ width: "4%" }}></h6>
        <h6 style={{ width: "4%" }}></h6>
      </div>
      {posts.map((post, index) => (
        <RenderData
          key={post.id}
          index={index}
          post={post}
          setPosts={setPosts}
          db={props.db}
        />
      ))}

      <div
        className="mx-auto mb-3 py-2"
        style={{
          maxWidth: "98%",
          backgroundColor: "white",
          borderRadius: "50px ",
          boxShadow: "3px 3px 3px 3px #D5D6D8",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      {/* <div className="container mt-5">
          <h1 className="text-primary mb-3">
              My Blob
          </h1>
          <Posts  posts={currentPosts} loading={loading} />
          <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage}/>
      </div> */}
    </React.Fragment>
  );
};

export default LocationData;
