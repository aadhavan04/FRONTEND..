import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Nutrition() {
  const navigate = useNavigate();

  const [goalType, setGoalType] = useState("");
  const [weight, setWeight] = useState("");
  const [goalCalories, setGoalCalories] = useState(0);

  const [intake, setIntake] = useState("");
  const [error, setError] = useState("");

  // ✅ LOAD FROM LOCAL STORAGE
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("nutritionHistory");
    return saved
      ? JSON.parse(saved)
      : {
          "weight loss": [],
          "muscle gain": [],
          "maintenance": []
        };
  });

  // ✅ SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("nutritionHistory", JSON.stringify(history));
  }, [history]);

  // ✅ CALCULATE CALORIES
  useEffect(() => {
    const w = Number(weight);

    if (!w || !goalType) {
      setGoalCalories(0);
      return;
    }

    if (goalType === "muscle gain") setGoalCalories(w * 32);
    else if (goalType === "weight loss") setGoalCalories(w * 25);
    else setGoalCalories(w * 28);

  }, [weight, goalType]);

  // ✅ ADD INTAKE
  const handleAdd = () => {
    if (!goalType) {
      setError("Please select your goal");
      return;
    }

    if (!intake) return;

    const val = Number(intake);

    setHistory((prev) => ({
      ...prev,
      [goalType]: [...(prev[goalType] || []), val]
    }));

    setIntake("");
    setError("");
  };

  // ✅ RESET
  const handleReset = () => {
    const empty = {
      "weight loss": [],
      "muscle gain": [],
      "maintenance": []
    };

    setHistory(empty);
    localStorage.removeItem("nutritionHistory");
  };

  const currentHistory = history[goalType] || [];

  const total = currentHistory.reduce(
    (sum, v) => sum + Number(v || 0),
    0
  );

  const progress =
    goalCalories > 0
      ? Math.min((total / goalCalories) * 100, 100)
      : 0;

  const isGoalReached = progress === 100;

  return (
    <div className="container">

      <button className="back-btn" onClick={() => navigate("/home")}>
        ⬅ Home
      </button>

      <h1>Nutrition Planner</h1>

      {/* GOAL BUTTONS */}
      <div style={{ display: "flex", gap: "15px", margin: "10px 0" }}>
        <button onClick={() => setGoalType("weight loss")}>
          Weight Loss
        </button>

        <button onClick={() => setGoalType("muscle gain")}>
          Muscle Gain
        </button>

        <button onClick={() => setGoalType("maintenance")}>
          Maintenance
        </button>
      </div>

      <h3>Enter Weight (kg)</h3>

      <input
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <p>Goal: {goalType}</p>
      <p>Calories Target: {goalCalories}</p>

      <h2>Your Intake</h2>

      <input
        placeholder="Calories"
        value={intake}
        onChange={(e) => setIntake(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Progress</h2>

      <p>Total Intake: {total}</p>

      <div style={{ width: "100%", background: "#ddd", height: "20px" }}>
        <div
          style={{
            width: `${progress}%`,
            background: "orange",
            height: "100%"
          }}
        ></div>
      </div>

      <p>{progress.toFixed(0)}%</p>

      {/* ✅ SUCCESS MESSAGE */}
      {isGoalReached && (
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <p style={{ color: "green", fontWeight: "bold" }}>
            Congratulations! You have achieved your Goal and Calories Target!
          </p>

          <button onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default Nutrition;