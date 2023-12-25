import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { environment } from "../environment/environment";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${environment.apiUrl}/api/v1/blog/delete-blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        toast.success("Blog Deleted Successfully..");
        window.location.reload();
      } else {
        toast.error("Error Occurs..");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        flex: "0 0 47%",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
        marginBottom: "20px",
      }}
      style={{ width: "155vh", marginLeft: "160px" }}
    >
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
      <Box display="flex" flexDirection="column" height="100%">
        {isUser && (
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleEdit}>
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {username}
            </Avatar>
          }
          title={
            <div style={{ fontFamily: "serif", fontSize: "20px" }}>
              {username}
            </div>
          }
          subheader={
            new Date(time).toLocaleDateString("en-GB") +
            " " +
            new Date(time).toLocaleTimeString()
          }
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
          style={{ height: "60vh" }}
        />
        <CardContent>
          <Typography
            variant="h6"
            color="text.secondary"
            style={{
              fontFamily: "serif",
              fontWeight: "bold",
              marginBottom: "5px",
              fontStyle: "italic",
              textDecoration: "underline",
              fontSize: "23px",
            }}
          >
            <span
              style={{
                fontStyle: "italic",
                color: "black",
                textDecoration: "none",
                fontSize: "30px",
              }}
            >
              Title :
            </span>{" "}
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              fontFamily: "cursive",
              fontSize: "17px",
            }}
          >
            <span
              style={{
                fontStyle: "italic",
                color: "black",
                textDecoration: "underline",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {" "}
              Description :
            </span>{" "}
            {description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
