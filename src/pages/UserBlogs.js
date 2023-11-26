import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { environment } from "../environment/environment";
import { CircularProgress } from "@mui/material";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  //get user blogs
  const getUserBlogs = async () => {
    setLoading(true);
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `${environment.apiUrl}/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setBlogs(data?.userBlog?.blogs);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
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
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1
          style={{
            fontFamily: "serif",
            textAlign: "center",
            marginTop: "40vh",
            fontSize:"45px"
          }}
        >
          You Haven't Created any blog
        </h1>
      )}
    </div>
  );
};

export default UserBlogs;
