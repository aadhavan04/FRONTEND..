import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  ToastContainer,
  toast
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Profile() {

  const navigate =
    useNavigate();

  /* CURRENT USER */

  const [user,
    setUser] =
    useState(null);

  /* LOGOUT */

  const handleLogout = () => {

    localStorage.removeItem(
      "user"
    );

    toast.success(
      "Logged Out Successfully!"
    );

    setTimeout(() => {

      navigate("/login");

    }, 1000);
  };

  /* LOAD USER */

  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "user"
      );

    if (savedUser) {

      setUser(
        JSON.parse(
          savedUser
        )
      );
    }

  }, []);

  /* LOADING */

  if (!user) {

    return (
      <h2>
        Loading...
      </h2>
    );
  }

  return (

    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        padding: "30px"
      }}
    >

      <ToastContainer />

      {/* HEADER */}

      <div
        style={{
          background:
            "#ec4899",

          color:
            "white",

          padding:
            "30px",

          borderRadius:
            "20px",

          marginBottom:
            "30px"
        }}
      >

        <h1>
          User Profile
        </h1>

        <p>
          Health & Wellness Tracker
        </p>

      </div>

      {/* USER DETAILS */}

      <div
        style={{
          background:
            "white",

          padding:
            "25px",

          borderRadius:
            "15px",

          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)",

          marginBottom:
            "30px"
        }}
      >

        <h2>
          User Information
        </h2>

        <p>
          <b>
            Username:
          </b>
          {" "}
          {user.name}
        </p>

        <p>
          <b>
            Email:
          </b>
          {" "}
          {user.email}
        </p>

        <p>
          <b>
            User ID:
          </b>
          {" "}
          {user.id}
        </p>

      </div>

      {/* LOGOUT BUTTON */}

      <div
        style={{
          marginTop: "20px"
        }}
      >

        <button
          onClick={handleLogout}

          style={{
            padding:
              "12px 20px",

            background:
              "#ec4899",

            color:
              "white",

            border:
              "none",

            borderRadius:
              "10px",

            cursor:
              "pointer"
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;