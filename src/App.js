import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const getToken = () => {
    const retrievedToken = localStorage.getItem("token");
    setToken(retrievedToken);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      getToken();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
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
    );
  }

  return (
    <>
      {token ? (
        <>
          <Header />
          <Toaster />
          <Routes>
            {/* Restricted routes for users with a token */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/my-blogs" element={<UserBlogs />} />
            <Route path="/blog-details/:id" element={<BlogDetails />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <>
          {/* Only allow access to login and register pages for users without a token */}
          <Header />
          <Toaster />
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/my-blogs"
              element={<Navigate to="/login" replace />}
            />
            <Route
              path="/blog-details/:id"
              element={<Navigate to="/login" replace />}
            />
            <Route
              path="/create-blog"
              element={<Navigate to="/login" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
