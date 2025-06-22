import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to access the dashboard.");
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3100/pages/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setMessage(res.data.msg);
        })
        .catch(() => {
          alert("Invalid token, please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;