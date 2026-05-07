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
    distance: "",
    calories: ""
  });

  const [workouts, setWorkouts] = useState([]);
  const [goal, setGoal] = useState(500);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get(
        `https://backend-wh-nudx.onrender.com/api/workout/${currentUser.email}`
      );

      setWorkouts(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {

    if (
      !data.type ||
      !data.duration ||
      !data.distance ||
      !data.calories
    ) {
      setError("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "https://backend-wh-nudx.onrender.com/api/workout/add",
        data
      );

      fetchWorkouts();

      setError("");

      setData({
        userId: currentUser.email,
        type: "",
        duration: "",
        distance: "",
        calories: ""
      });

    } catch (err) {
      console.log(err);
    }
  };

  const totalCalories = workouts.reduce(
    (sum, w) => sum + Number(w.calories),
    0
  );

  const progress =
    goal > 0
      ? Math.min((totalCalories / goal) * 100, 100)
      : 0;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>

      <button
  onClick={() => navigate("/home")}
  style={{
    position: "fixed",
    top: "20px",
    left: "20px",
    padding: "10px 15px",
    borderRadius: "10px"
  }}
>
  ⬅ Home
</button>

      <h1>Fitness Tracker</h1>

      <h2>Add Exercise</h2>

      {/* Exercise Type */}
      <select
        value={data.type}
        onChange={(e) =>
          setData({ ...data, type: e.target.value })
        }
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0"
        }}
      >
        <option value="">Select Exercise</option>
        <option value="Running">Running</option>
        <option value="Cycling">Cycling</option>
        <option value="Walking">Walking</option>
        <option value="Strength Training">
          Strength Training
        </option>
        <option value="Yoga">Yoga</option>
        <option value="Swimming">Swimming</option>
      </select>

      {/* Duration */}
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={data.duration}
        onChange={(e) =>
          setData({ ...data, duration: e.target.value })
        }
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0"
        }}
      />

      {/* Distance */}
      <input
        type="number"
        placeholder="Distance (km)"
        value={data.distance}
        onChange={(e) =>
          setData({ ...data, distance: e.target.value })
        }
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0"
        }}
      />

      {/* Calories */}
      <input
        type="number"
        placeholder="Calories Burned"
        value={data.calories}
        onChange={(e) =>
          setData({ ...data, calories: e.target.value })
        }
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0"
        }}
      />

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      <button
        onClick={handleAdd}
        style={{ marginTop: "10px" }}
      >
        Add Workout
      </button>

      <h2 style={{ marginTop: "30px" }}>
        Workout History
      </h2>

      {workouts.map((w, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px 0",
            borderRadius: "10px",
            background: "white"
          }}
        >
          <p><b>Exercise:</b> {w.type}</p>

          <p>
            <b>Duration:</b> {w.duration} mins
          </p>

          <p>
            <b>Distance:</b> {w.distance} km
          </p>

          <p>
            <b>Calories:</b> {w.calories} cal
          </p>
        </div>
      ))}

      <h2>Calories Progress</h2>

      <input
        type="number"
        placeholder="Goal Calories"
        value={goal}
        onChange={(e) =>
          setGoal(Number(e.target.value))
        }
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <p>Total Calories Burned: {totalCalories}</p>

      <div
        style={{
          width: "100%",
          background: "#ddd",
          height: "20px",
          borderRadius: "10px"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            background: "green",
            height: "100%",
            borderRadius: "10px"
          }}
        ></div>
      </div>

      <p>{progress.toFixed(0)}%</p>

    </div>
  );
}

export default Workout;