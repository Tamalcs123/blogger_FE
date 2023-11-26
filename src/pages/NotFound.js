import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { environment } from "../environment/environment";
import { CircularProgress } from "@mui/material";
const UserBlogs = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {loading && (
        <div
          className=""
          role="status"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "9999",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ height: "5rem", width: "5rem", color: "white" }}>
            <CircularProgress size={70} style={{ color: "#1976D2" }} />
          </div>
        </div>
      )}

      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSACIx8v2tuPq4AIPOlgIvQkE6x1gHt3RH2Fh5kydwij5OcnFObeC1cVg5ZWgAghTEXR9A&usqp=CAU"
        style={{height:"300px", width:"350px", marginTop:"50px", marginLeft:"450px"}}
      />

      <h1
        style={{
          fontFamily: "serif",
          textAlign: "center",
          marginTop: "40vh",
          fontSize: "45px",
          marginTop:"-15px"
        }}
      >
        Oops!!! No page found!!!
      </h1>
    </div>
  );
};

export default UserBlogs;
