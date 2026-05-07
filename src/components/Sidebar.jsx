import {
  Link,
  useLocation
} from "react-router-dom";

function Sidebar() {

  const location =
    useLocation();

  const activeStyle = (
    path
  ) => ({
    background:
      location.pathname === path
        ? "#ec4899"
        : "transparent",

    color: "white",

    padding: "12px",

    borderRadius: "10px",

    textDecoration: "none",

    display: "block",

    marginBottom: "10px"
  });

  return (
    <div
      style={{
        width: "250px",
        background: "#111827",
        minHeight: "100vh",
        padding: "20px"
      }}
    >

      <h2
        style={{
          color: "white"
        }}
      >
        Health & Wellness
      </h2>

      <div
        style={{
          marginTop: "30px"
        }}
      >

        <Link
          to="/home/dashboard"
          style={activeStyle(
            "/home/dashboard"
          )}
        >
          Dashboard
        </Link>

        <Link
          to="/home/fitness"
          style={activeStyle(
            "/home/fitness"
          )}
        >
          Fitness Tracking
        </Link>

        <Link
          to="/home/nutrition"
          style={activeStyle(
            "/home/nutrition"
          )}
        >
          Nutrition Planning
        </Link>

        <Link
          to="/home/goals"
          style={activeStyle(
            "/home/goals"
          )}
        >
          Goal Setting
        </Link>

        <Link
          to="/home/profile"
          style={activeStyle(
            "/home/profile"
          )}
        >
          User Profile
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;