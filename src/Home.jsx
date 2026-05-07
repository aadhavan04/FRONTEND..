import Sidebar from "./components/Sidebar";

import {
  Outlet
} from "react-router-dom";

function Home() {

  return (
    <div
      style={{
        display: "flex"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f3f4f6",
          minHeight: "100vh"
        }}
      >

        <Outlet />

      </div>

    </div>
  );
}

export default Home;