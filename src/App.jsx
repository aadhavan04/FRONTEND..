import {
  Routes,
  Route
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";


import Home from "./Home";

import Dashboard from "./pages/Dashboard";
import Fitness from "./pages/Fitness";
import Nutrition from "./pages/Nutrition";
import Goals from "./pages/Goals";
import Profile from "./pages/Profile";
import UpdateProgress from "./pages/UpdateProgress";

function App() {

  return (
    <Routes>

      {/* Auth Pages */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
          path="/login"
          element={<Login />}
        />

      {/* Home Layout */}

      <Route
        path="/home"
        element={<Home />}
      >

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="fitness"
          element={<Fitness />}
        />

        <Route
          path="nutrition"
          element={<Nutrition />}
        />

        <Route
          path="goals"
          element={<Goals />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

        <Route
  path="update-progress/:id"
  element={<UpdateProgress />}
/>

      </Route>

    </Routes>
  );
}

export default App;