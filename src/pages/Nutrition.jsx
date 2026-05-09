import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Nutrition() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser.id;

  const [goalType, setGoalType] = useState("");
  const [goalCalories, setGoalCalories] = useState(2000);
  const [food, setFood] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const [foods, setFoods] = useState(() => {
    const saved = localStorage.getItem(
      `nutritionFoods_${userId}`
    );

    return saved
      ? JSON.parse(saved)
      : {
          "Weight Loss": [],
          "Muscle Gain": [],
          Maintenance: [],
        };
  });

  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(
      `nutritionFoods_${userId}`,
      JSON.stringify(foods)
    );
  }, [foods, userId]);

  const handleAddFood = () => {
    if (!goalType) {
      setError("Please select a goal");
      return;
    }

    if (
      !food.name ||
      !food.calories ||
      !food.protein ||
      !food.carbs ||
      !food.fat
    ) {
      setError("Please fill all fields");
      return;
    }

    setFoods((prev) => ({
      ...prev,
      [goalType]: [...prev[goalType], food],
    }));

    setFood({
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    });

    setError("");

    toast.success("Food Added Successfully!");
  };

  const currentFoods = foods[goalType] || [];

  const totalCalories = currentFoods.reduce(
    (s, f) => s + Number(f.calories),
    0
  );

  const totalProtein = currentFoods.reduce(
    (s, f) => s + Number(f.protein),
    0
  );

  const totalCarbs = currentFoods.reduce(
    (s, f) => s + Number(f.carbs),
    0
  );

  const totalFat = currentFoods.reduce(
    (s, f) => s + Number(f.fat),
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
      toast.success(
        `${goalType} Goal Achieved! 🎉`
      );

    else if (progress >= 80)
      toast.info(
        `Only ${(100 - progress).toFixed(
          0
        )}% calories remaining`
      );

    else if (progress >= 50)
      toast.info(
        `Great! ${progress.toFixed(
          0
        )}% completed`
      );
  }, [progress]);

  const goalConfig = {
    "Weight Loss": {
      icon: "⚖️",
      color: "#3b82f6",
    },

    "Muscle Gain": {
      icon: "💪",
      color: "#10b981",
    },

    Maintenance: {
      icon: "🎯",
      color: "#f59e0b",
    },
  };

  return (
    <div
      className="fade-in"
      style={{
        maxWidth: "780px",
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
          box-shadow: 0 12px 30px rgba(236,72,153,0.12);
        }

        .food-card {
          transition: all 0.25s ease;
        }

        .food-card:hover {
          transform: scale(1.02);
          border-color: #ec4899;
        }

        .primary-btn-hover {
          transition: all 0.25s ease;
        }

        .primary-btn-hover:hover {
          transform: translateY(-2px);
          opacity: 0.95;
          box-shadow: 0 10px 24px rgba(236,72,153,0.22);
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

      {/* Header */}

      <div
        className="hover-card"
        style={{
          background:
            "linear-gradient(135deg, #f59e0b, #ec4899)",
          borderRadius: "20px",
          padding: "28px 32px",
          marginBottom: "28px",
          color: "white",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "800",
          }}
        >
          🥗 Nutrition Planner
        </h1>

        <p
          style={{
            margin: "6px 0 0",
            opacity: 0.85,
          }}
        >
          Track your daily nutrition and
          reach your goals
        </p>
      </div>

      {/* Goal Selection */}

      <div
        className="hover-card"
        style={card}
      >
        <h2 style={sectionTitle}>
          🎯 Select Your Goal
        </h2>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(goalConfig).map(
            ([name, cfg]) => (
              <button
                key={name}
                onClick={() =>
                  setGoalType(name)
                }
                className="primary-btn-hover"
                style={{
                  padding: "10px 20px",
                  borderRadius: "12px",
                  border: `2px solid ${
                    goalType === name
                      ? cfg.color
                      : "#e5e7eb"
                  }`,
                  background:
                    goalType === name
                      ? cfg.color
                      : "white",
                  color:
                    goalType === name
                      ? "white"
                      : "#374151",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cfg.icon} {name}
              </button>
            )
          )}
        </div>

        {goalType && (
          <div style={{ marginTop: "16px" }}>
            <label style={label}>
              Daily Calorie Goal
            </label>

            <input
              type="number"
              placeholder="e.g. 2000"
              value={goalCalories}
              onChange={(e) =>
                setGoalCalories(
                  Number(e.target.value)
                )
              }
              style={inputStyle}
              className="input-hover"
            />
          </div>
        )}
      </div>

      {/* Food Form */}

      <div
        className="hover-card"
        style={card}
      >
        <h2 style={sectionTitle}>
          ➕ Add Food Entry
        </h2>

        <div>
          <label style={label}>
            Food Name
          </label>

          <input
            placeholder="e.g. eggs"
            value={food.name}
            onChange={(e) =>
              setFood({
                ...food,
                name: e.target.value,
              })
            }
            style={inputStyle}
            className="input-hover"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "14px",
            marginTop: "14px",
          }}
        >
          {[
            [
              "Calories (kcal)",
              "calories",
              "e.g. 250",
            ],

            [
              "Protein (g)",
              "protein",
              "e.g. 30",
            ],

            [
              "Carbs (g)",
              "carbs",
              "e.g. 10",
            ],

            [
              "Fat (g)",
              "fat",
              "e.g. 5",
            ],
          ].map(([lbl, key, ph]) => (
            <div key={key}>
              <label style={label}>
                {lbl}
              </label>

              <input
                type="number"
                placeholder={ph}
                value={food[key]}
                onChange={(e) =>
                  setFood({
                    ...food,
                    [key]:
                      e.target.value,
                  })
                }
                style={inputStyle}
                className="input-hover"
              />
            </div>
          ))}
        </div>

        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            ⚠️ {error}
          </p>
        )}

        <button
          onClick={handleAddFood}
          style={primaryBtn}
          className="primary-btn-hover"
        >
          Add Food
        </button>
      </div>

      {/* Progress */}

      {goalType && (
        <div
          className="hover-card"
          style={card}
        >
          <h2 style={sectionTitle}>
            📊 Calories Progress —
            {goalType}
          </h2>

          <div
            style={{
              background: "#f3f4f6",
              borderRadius: "12px",
              height: "16px",
              overflow: "hidden",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, #f59e0b, #ec4899)",
                height: "100%",
                borderRadius: "12px",
                transition:
                  "width 0.5s",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              fontSize: "14px",
              color: "#6b7280",
            }}
          >
            <span>
              {totalCalories} consumed
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

          {/* Macro Summary */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            {[
              [
                "🥩 Protein",
                totalProtein,
                "g",
                "#3b82f6",
              ],

              [
                "🍚 Carbs",
                totalCarbs,
                "g",
                "#f59e0b",
              ],

              [
                "🧈 Fat",
                totalFat,
                "g",
                "#ef4444",
              ],
            ].map(([n, v, u, c]) => (
              <div
                key={n}
                className="hover-card"
                style={{
                  background: "#f9fafb",
                  borderRadius: "12px",
                  padding: "14px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                  }}
                >
                  {n}
                </div>

                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "800",
                    color: c,
                  }}
                >
                  {v}
                  {u}
                </div>
              </div>
            ))}
          </div>

          {progress >= 100 && (
            <div
              style={{
                marginTop: "16px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#10b981",
                  fontWeight: "700",
                }}
              >
                Goal Achieved!
              </p>

              <button
                onClick={() => {
                  setFoods((prev) => ({
                    ...prev,
                    [goalType]: [],
                  }));

                  toast.info(
                    "Records Reset!"
                  );
                }}
                className="primary-btn-hover"
                style={{
                  ...primaryBtn,
                  background: "#ef4444",
                  width: "auto",
                  padding: "10px 24px",
                }}
              >
                Reset Records
              </button>
            </div>
          )}
        </div>
      )}

      {/* Food Records */}

      {currentFoods.length > 0 && (
        <div
          className="hover-card"
          style={card}
        >
          <h2 style={sectionTitle}>
            🍽️ {goalType} Food Records
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {currentFoods.map((f, i) => (
              <div
                key={i}
                className="food-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  background: "#fdf4ff",
                  border:
                    "1px solid #f0abfc",
                  borderRadius: "14px",
                  padding: "14px 18px",
                }}
              >
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  🍱 {f.name}
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
                      "🔥",
                      f.calories,
                      "kcal",
                    ],

                    [
                      "🥩",
                      f.protein,
                      "g",
                    ],

                    [
                      "🍚",
                      f.carbs,
                      "g",
                    ],

                    [
                      "🧈",
                      f.fat,
                      "g",
                    ],
                  ].map(
                    ([ic, v, u], j) => (
                      <span
                        key={j}
                        style={{
                          background:
                            "white",
                          border:
                            "1px solid #e9d5ff",
                          borderRadius:
                            "8px",
                          padding:
                            "3px 10px",
                          fontSize:
                            "13px",
                        }}
                      >
                        {ic} {v}
                        {u}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const card = {
  background: "white",
  borderRadius: "18px",
  padding: "24px",
  marginBottom: "24px",
  boxShadow:
    "0 2px 16px rgba(0,0,0,0.07)",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#111827",
  marginBottom: "16px",
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
  padding: "11px 14px",
  borderRadius: "10px",
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
  marginTop: "18px",
  padding: "13px",
  background:
    "linear-gradient(135deg, #f59e0b, #ec4899)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
};

export default Nutrition;