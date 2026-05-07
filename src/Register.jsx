import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "./assets/H&W.jpg";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
     await axios.post(
  "https://backend-wh-nudx.onrender.com/api/auth/register",
  data
); 

      setError("");

      alert("Registered Successfully");

      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div
  className="container"
  style={{
     backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textDecoration: "none",
        fontWeight: "bold",
        margin:"0%", 
        padding: "0",
        boxSizing: "border box",
minHeight: "100vh",
width: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }}
>

      <h1 className="app-title">HEALTH & WELLNESS</h1>
      <h2 className="register">REGISTER</h2>

      <div className="form">

        <input
          placeholder="Name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

      </div>

      <br />

      <button onClick={handleRegister}>Register</button>

     
      {error && <p className="error-text">{error}</p>}

      <p style={{ marginTop: "15px" , color: "white"}}>
        Already have an account?{" "}
        <Link
  to="/login"
  style={{
    color: "lightblue",
    textDecoration: "none",
    fontWeight: "bold"
  }}
>
  Login
</Link>
      </p>

    </div>
  );
}

export default Register;