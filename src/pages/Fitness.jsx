import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Fitness() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser.id;

  const [goalCalories, setGoalCalories] = useState(1000);

  const [exercise, setExercise] = useState({
    type: "",
    duration: "",
    distance: "",
    calories: "",
  });

  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem(
      `fitnessWorkouts_${userId}`
    );

    return saved ? JSON.parse(saved) : [];
  });

  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(
      `fitnessWorkouts_${userId}`,
      JSON.stringify(workouts)
    );
  }, [workouts]);

  const handleAddWorkout = () => {
    if (
      !exercise.type ||
      !exercise.duration ||
      !exercise.distance ||
      !exercise.calories
    ) {
      setError("Please fill all fields");
      return;
    }

    setWorkouts([...workouts, exercise]);

    setExercise({
      type: "",
      duration: "",
      distance: "",
      calories: "",
    });

    setError("");

    toast.success("Workout Added Successfully!");
  };

  const totalCalories = workouts.reduce(
    (s, w) => s + Number(w.calories),
    0
  );

  const totalDuration = workouts.reduce(
    (s, w) => s + Number(w.duration),
    0
  );

  const totalDistance = workouts.reduce(
    (s, w) => s + Number(w.distance),
    0
  );

  const progress =
    goalCalories > 0
      ? Math.min(
          (totalCalories / goalCalories) * 100,
          100
        )
      : 0;

  useEffect(() => {
    if (progress >= 100)
      toast.success("Fitness Goal Achieved!");

    else if (progress >= 80)
      toast.info(
        `Only ${(100 - progress).toFixed(
          0
        )}% remaining!`
      );

    else if (progress >= 50)
      toast.info(
        `Great! You completed ${progress.toFixed(
          0
        )}%`
      );
  }, [progress]);

  const exerciseIcons = {
    Running: "🏃",
    Cycling: "🚴",
    "Strength Training": "🏋️",
    Yoga: "🧘",
    Swimming: "🏊",
    Walking: "🚶",
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "auto",
        padding: "24px",
      }}
    >
      <ToastContainer />

      {/* ANIMATIONS */}

      <style>{`
        .fade-in {
          animation: fadeIn 0.6s ease;
        }

        .hover-card {
          transition: all 0.3s ease;
        }

        .hover-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(236,72,153,0.15);
        }

        .workout-card {
          transition: all 0.3s ease;
        }

        .workout-card:hover {
          transform: scale(1.02);
          border-color: #ec4899;
        }

        .primary-btn-hover {
          transition: all 0.25s ease;
        }

        .primary-btn-hover:hover {
          transform: translateY(-2px);
          opacity: 0.95;
          box-shadow: 0 10px 24px rgba(236,72,153,0.25);
        }

        .input-hover {
          transition: all 0.2s ease;
        }

        .input-hover:focus {
          border-color: #ec4899 !important;
          box-shadow: 0 0 0 4px rgba(236,72,153,0.1);
          background: white !important;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* HERO */}

      <div
        className="fade-in"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: "28px",
          padding: "38px",
          marginBottom: "30px",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* GLOW */}

        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.3), transparent 70%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "20%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)",
          }}
        />

        <div style={{ position: "relative" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "40px",
              fontWeight: "800",
            }}
          >
            🏋️ Fitness Tracker
          </h1>

          <p
            style={{
              marginTop: "10px",
              opacity: 0.8,
              fontSize: "16px",
            }}
          >
            Log workouts, burn calories and
            track your progress beautifully.
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "24px",
            }}
          >
            <div style={heroBadge}>
              🔥 {totalCalories} Calories Burned
            </div>

            <div style={heroBadge}>
              ⏱️ {totalDuration} Minutes
            </div>

            <div style={heroBadge}>
              📍 {totalDistance} KM Covered
            </div>
          </div>
        </div>
      </div>

      {/* FORM CARD */}

      <div
        className="hover-card fade-in"
        style={card}
      >
        <h2 style={sectionTitle}>
          🎯 Set Daily Calorie Goal
        </h2>

        <input
          type="number"
          placeholder="e.g. 1000 calories"
          value={goalCalories}
          onChange={(e) =>
            setGoalCalories(Number(e.target.value))
          }
          style={inputStyle}
          className="input-hover"
        />

        <h2
          style={{
            ...sectionTitle,
            marginTop: "28px",
          }}
        >
          ➕ Add Exercise
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "16px",
          }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={label}>
              Exercise Type
            </label>

            <select
              value={exercise.type}
              onChange={(e) =>
                setExercise({
                  ...exercise,
                  type: e.target.value,
                })
              }
              style={inputStyle}
              className="input-hover"
            >
              <option value="">
                Select Exercise
              </option>

              {[
                "Running",
                "Cycling",
                "Strength Training",
                "Yoga",
                "Swimming",
                "Walking",
              ].map((ex) => (
                <option key={ex}>
                  {ex}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={label}>
              Duration (mins)
            </label>

            <input
              type="number"
              placeholder="e.g. 30"
              value={exercise.duration}
              onChange={(e) =>
                setExercise({
                  ...exercise,
                  duration: e.target.value,
                })
              }
              style={inputStyle}
              className="input-hover"
            />
          </div>

          <div>
            <label style={label}>
              Distance (km)
            </label>

            <input
              type="number"
              placeholder="e.g. 5"
              value={exercise.distance}
              onChange={(e) =>
                setExercise({
                  ...exercise,
                  distance: e.target.value,
                })
              }
              style={inputStyle}
              className="input-hover"
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={label}>
              Calories Burned
            </label>

            <input
              type="number"
              placeholder="e.g. 300"
              value={exercise.calories}
              onChange={(e) =>
                setExercise({
                  ...exercise,
                  calories: e.target.value,
                })
              }
              style={inputStyle}
              className="input-hover"
            />
          </div>
        </div>

        {error && (
          <p
            style={{
              color: "#ef4444",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            ⚠️ {error}
          </p>
        )}

        <button
          onClick={handleAddWorkout}
          style={primaryBtn}
          className="primary-btn-hover"
        >
          Add Exercise
        </button>
      </div>

      {/* SUMMARY */}

      <div
        className="fade-in"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {[
          {
            label: "Workouts",
            value: workouts.length,
            icon: "💪",
            gradient:
              "linear-gradient(135deg,#ec4899,#be185d)",
          },

          {
            label: "Duration",
            value: `${totalDuration} mins`,
            icon: "⏱️",
            gradient:
              "linear-gradient(135deg,#8b5cf6,#6d28d9)",
          },

          {
            label: "Distance",
            value: `${totalDistance} km`,
            icon: "📍",
            gradient:
              "linear-gradient(135deg,#06b6d4,#2563eb)",
          },

          {
            label: "Calories",
            value: totalCalories,
            icon: "🔥",
            gradient:
              "linear-gradient(135deg,#f59e0b,#ea580c)",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="hover-card"
            style={{
              background: s.gradient,
              borderRadius: "24px",
              padding: "24px",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background:
                  "rgba(255,255,255,0.12)",
              }}
            />

            <div
              style={{
                fontSize: "38px",
                marginBottom: "12px",
              }}
            >
              {s.icon}
            </div>

            <div
              style={{
                fontSize: "15px",
                opacity: 0.9,
              }}
            >
              {s.label}
            </div>

            <div
              style={{
                fontSize: "32px",
                fontWeight: "800",
                marginTop: "6px",
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* PROGRESS */}

      <div
        className="hover-card fade-in"
        style={card}
      >
        <h2 style={sectionTitle}>
          Calories Goal Progress
        </h2>

        <div style={progressBg}>
          <div
            style={{
              ...progressFill,
              width: `${progress}%`,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginTop: "10px",
            fontSize: "14px",
            color: "#6b7280",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span>
            {totalCalories} burned
          </span>

          <span
            style={{
              fontWeight: "700",
              color: "#ec4899",
            }}
          >
            {progress.toFixed(0)}%
          </span>

          <span>
            Goal: {goalCalories}
          </span>
        </div>

        {progress >= 100 && (
          <div
            style={{
              marginTop: "22px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#10b981",
                fontWeight: "700",
                fontSize: "17px",
              }}
            >
              Goal Achieved!
            </p>

            <button
              onClick={() => {
                setWorkouts([]);
                toast.info("Records Reset!");
              }}
              style={{
                ...primaryBtn,
                background:
                  "linear-gradient(135deg,#ef4444,#dc2626)",
                width: "auto",
                padding: "12px 26px",
              }}
              className="primary-btn-hover"
            >
              Reset Records
            </button>
          </div>
        )}
      </div>

      {/* WORKOUT RECORDS */}

      {workouts.length > 0 && (
        <div
          className="hover-card fade-in"
          style={card}
        >
          <h2 style={sectionTitle}>
            Workout Records
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {workouts.map((w, i) => (
              <div
                key={i}
                className="workout-card"
                style={{
                  background:
                    "linear-gradient(135deg,#fdf4ff,#faf5ff)",
                  border:
                    "1px solid #f0abfc",
                  borderRadius: "18px",
                  padding: "18px",
                }}
              >
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "17px",
                    marginBottom: "14px",
                    color: "#111827",
                  }}
                >
                  {exerciseIcons[w.type] ||
                    "🏃"}{" "}
                  {w.type}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    [
                      "⏱️",
                      w.duration,
                      "mins",
                    ],

                    [
                      "📍",
                      w.distance,
                      "km",
                    ],

                    [
                      "🔥",
                      w.calories,
                      "cal",
                    ],
                  ].map(
                    ([icon, val, unit], j) => (
                      <span
                        key={j}
                        style={badge}
                      >
                        {icon} {val} {unit}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHART */}

      {workouts.length > 0 && (
        <div
          className="hover-card fade-in"
          style={card}
        >
          <h2 style={sectionTitle}>
            📊 Calories Burn Chart
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={workouts}>
              <XAxis
                dataKey="type"
                tick={{ fontSize: 12 }}
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="calories"
                fill="#ec4899"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

/* STYLES */

const heroBadge = {
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.12)",
  padding: "10px 16px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: "600",
};

const card = {
  background: "white",
  borderRadius: "24px",
  padding: "28px",
  marginBottom: "30px",
  boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
};

const sectionTitle = {
  fontSize: "22px",
  fontWeight: "800",
  color: "#111827",
  marginBottom: "20px",
  marginTop: 0,
};

const label = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "13px 15px",
  borderRadius: "12px",
  border: "1.5px solid #e5e7eb",
  fontSize: "15px",
  outline: "none",
  background: "#f9fafb",
  boxSizing: "border-box",
  color: "#111827",
};

const primaryBtn = {
  display: "block",
  width: "100%",
  marginTop: "20px",
  padding: "14px",
  background:
    "linear-gradient(135deg, #ec4899, #8b5cf6)",
  color: "white",
  border: "none",
  borderRadius: "14px",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
};

const progressBg = {
  background: "#f3f4f6",
  borderRadius: "14px",
  height: "18px",
  overflow: "hidden",
};

const progressFill = {
  background:
    "linear-gradient(90deg,#ec4899,#8b5cf6)",
  height: "100%",
  borderRadius: "14px",
  transition: "width 0.5s ease",
};

const badge = {
  background: "white",
  border: "1px solid #e9d5ff",
  borderRadius: "10px",
  padding: "6px 12px",
  fontSize: "13px",
  fontWeight: "500",
};

export default Fitness;