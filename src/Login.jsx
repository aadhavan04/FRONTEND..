import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { TbBackground } from "react-icons/tb";
import bgImage from "./assets/H&W.jpg";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
  "https://backend-wh-nudx.onrender.com/api/auth/login",
  data
);

      
      setError("");

     
      localStorage.setItem("user", JSON.stringify(res.data.user));

      
    navigate("/home/dashboard");

    } catch (err) {
      setError("Email or Password Incorrect");
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


    minHeight:
      "100vh",

 display:
      "flex",

    flexDirection:
      "column",

    justifyContent:
      "center",

    alignItems:
      "center"

  }}
>

      

      
     <h1
    className="app-title"
  >
    HEALTH & WELLNESS
  </h1>

     
      <h2 className="Login">LOGIN</h2>

     
      <div className="form">

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

      
      <button onClick={handleLogin}>Login</button>

     
      {error && <p className="error-text">{error}</p>}

      
      <p style={{ marginTop: "15px" , color: "white"}}>
        Don't have an account?{" "}
        <Link style={{color:"lightblue"}} to="/register">Register</Link>
      </p>

    </div>
  );
}
export default Login;