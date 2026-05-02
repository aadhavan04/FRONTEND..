import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Workout() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState({
    userId: currentUser.email,
    type: "",
    duration: "",
    calories: ""
  });

  const [workouts, setWorkouts] = useState([]);
  const [goal, setGoal] = useState(500);

  // 🔹 LOAD DATA
  useEffect(() => {
    const resetFlag = localStorage.getItem("workoutReset");

    if (resetFlag === "true") {
      setWorkouts([]);
    } else {
      fetchWorkouts();
    }
  }, []);

  // 🔹 FETCH FROM BACKEND
  const fetchWorkouts = async () => {
    const res = await axios.get(
      `https://backend-wh-nudx.onrender.com/api/workout/${currentUser.email}`
    );
    setWorkouts(res.data);
  };

  // 🔹 ADD WORKOUT
  const handleAdd = async () => {
    await axios.post(
      "https://backend-wh-nudx.onrender.com/api/workout/add",
      data
    );

    const resetFlag = localStorage.getItem("workoutReset");

    if (resetFlag === "true") {
      // build fresh list manually
      setWorkouts((prev) => [...prev, data]);
    } else {
      fetchWorkouts();
    }

    setData({
      userId: currentUser.email,
      type: "",
      duration: "",
      calories: ""
    });
  };

  // 🔥 RESET
  const handleReset = () => {
    localStorage.setItem("workoutReset", "true");

    setWorkouts([]);
    setGoal(500);

    setData({
      userId: currentUser.email,
      type: "",
      duration: "",
      calories: ""
    });
  };

  const totalCalories = workouts.reduce(
    (sum, w) => sum + Number(w.calories),
    0
  );

  const progress =
    goal > 0
      ? Math.min((totalCalories / goal) * 100, 100)
      : 0;

  const isGoalReached = progress === 100;

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>

      <button onClick={() => navigate("/home")}>⬅ Home</button>

      <h2>Your Workout</h2>

      <input
        placeholder="Type"
        value={data.type}
        onChange={(e) => setData({ ...data, type: e.target.value })}
        style={{ width: "100%", margin: "5px 0", padding: "8px" }}
      />

      {/* DURATION */}
      <div style={{ position: "relative" }}>
        <input
          placeholder="Duration"
          value={data.duration}
          onChange={(e) => setData({ ...data, duration: e.target.value })}
          style={{ width: "100%", margin: "5px 0", padding: "8px", paddingRight: "70px" }}
        />
        <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}>
          minutes
        </span>
      </div>

      {/* CALORIES */}
      <div style={{ position: "relative" }}>
        <input
          placeholder="Calories"
          value={data.calories}
          onChange={(e) => setData({ ...data, calories: e.target.value })}
          style={{ width: "100%", margin: "5px 0", padding: "8px", paddingRight: "50px" }}
        />
        <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}>
          cal
        </span>
      </div>

      <button onClick={handleAdd} style={{ marginTop: "10px" }}>
        Add Workout
      </button>

      <h2>Workout List</h2>

      {workouts.map((w, i) => (
        <div key={i} style={{
          border: "1px solid #ccc",
          padding: "15px",
          margin: "10px 0",
          borderRadius: "10px"
        }}>
          <p><b>Type:</b> {w.type}</p>
          <p><b>Duration:</b> {w.duration} minutes</p>
          <p><b>Calories:</b> {w.calories} cal</p>
        </div>
      ))}

      <h2>Progress</h2>

      <input
        placeholder="Set Goal Calories"
        value={goal}
        onChange={(e) => setGoal(Number(e.target.value))}
        style={{ width: "100%", padding: "8px" }}
      />

      <p>Total Calories: {totalCalories}</p>
      <p>Goal: {goal}</p>

      <div style={{ width: "100%", background: "#ddd", height: "20px" }}>
        <div style={{
          width: `${progress}%`,
          background: "green",
          height: "100%"
        }}></div>
      </div>

      <p>{progress.toFixed(0)}%</p>

      {isGoalReached && (
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <p style={{ color: "green", fontWeight: "bold" }}>
            Congratulations! You have achieved your total calories!
          </p>

          <button onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default Workout;