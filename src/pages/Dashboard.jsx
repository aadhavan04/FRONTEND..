import { useEffect, useState } from "react";
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

function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser.id;

  /* STATES */

  const [goals, setGoals] = useState([]);
  const [nutrition, setNutrition] = useState({
    "Weight Loss": [],
    "Muscle Gain": [],
    Maintenance: [],
  });

  const [workouts, setWorkouts] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");

  /* LOAD DATA */

  useEffect(() => {
    const savedGoals = localStorage.getItem(`goals_${userId}`);
    const savedNutrition = localStorage.getItem(
      `nutritionFoods_${userId}`
    );
    const savedWorkouts = localStorage.getItem(
      `fitnessWorkouts_${userId}`
    );

    if (savedGoals) setGoals(JSON.parse(savedGoals));

    if (savedNutrition)
      setNutrition(JSON.parse(savedNutrition));

    if (savedWorkouts)
      setWorkouts(JSON.parse(savedWorkouts));
  }, []);

  /* GOAL SUMMARY */

  const completedGoals = goals.filter((goal) => {
    const percentage =
      (goal.progress / goal.target) * 100;

    return percentage >= 100;
  }).length;

  /* NUTRITION SUMMARY */

  const allFoods = [
    ...nutrition["Weight Loss"],
    ...nutrition["Muscle Gain"],
    ...nutrition["Maintenance"],
  ];

  const totalCalories = allFoods.reduce(
    (sum, food) =>
      sum + Number(food.calories),
    0
  );

  /* FITNESS SUMMARY */

  const totalWorkoutCalories = workouts.reduce(
    (sum, workout) =>
      sum + Number(workout.calories),
    0
  );

  const totalWorkouts = workouts.length;

  /* TOASTS */

  useEffect(() => {
    if (completedGoals > 0) {
      toast.success(
        `${completedGoals} Goal(s) Completed!`
      );
    }

    if (totalWorkoutCalories >= 1000) {
      toast.info(
        "Amazing calorie burn progress!"
      );
    }

    if (totalCalories >= 2000) {
      toast.info(
        "Nutrition intake progressing well!"
      );
    }
  }, [
    completedGoals,
    totalWorkoutCalories,
    totalCalories,
  ]);

  /* CHART */

  const chartData = [
    {
      name: "Nutrition",
      calories: totalCalories,
    },

    {
      name: "Fitness",
      calories: totalWorkoutCalories,
    },
  ];

  const dashboardCards = [
    {
      title: "Goals Completed",
      value: completedGoals,
      icon: "🎯",
      key: "goals",
      gradient:
        "linear-gradient(135deg, #ec4899, #be185d)",
    },

    {
      title: "Calories Consumed",
      value: totalCalories,
      icon: "🥗",
      key: "nutrition",
      gradient:
        "linear-gradient(135deg, #f59e0b, #ea580c)",
    },

    {
      title: "Calories Burned",
      value: totalWorkoutCalories,
      icon: "🔥",
      key: "fitness",
      gradient:
        "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    },

    {
      title: "Total Workouts",
      value: totalWorkouts,
      icon: "🏋️",
      key: "workouts",
      gradient:
        "linear-gradient(135deg, #06b6d4, #2563eb)",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "24px",
      }}
    >
      <ToastContainer />

      {/* ANIMATIONS */}

      <style>{`
        .dashboard-card {
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .dashboard-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }

        .dashboard-card::before {
          content: "";
          position: absolute;
          top: -40px;
          right: -40px;
          width: 120px;
          height: 120px;
          background: rgba(255,255,255,0.12);
          border-radius: 50%;
        }

        .glass-card {
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(236,72,153,0.08);
        }

        .activity-item {
          transition: all 0.25s ease;
        }

        .activity-item:hover {
          transform: translateX(6px);
        }

        .fade-in {
          animation: fadeIn 0.6s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
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
          padding: "40px",
          color: "white",
          marginBottom: "30px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow Effects */}

        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.35), transparent 70%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "20%",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.28), transparent 70%)",
          }}
        />

        <div style={{ position: "relative" }}>
          <h1
            style={{
              fontSize: "40px",
              margin: 0,
              fontWeight: "800",
            }}
          >
            Welcome Back 👋
          </h1>

          <p
            style={{
              marginTop: "10px",
              fontSize: "16px",
              opacity: 0.8,
            }}
          >
            Track your fitness, nutrition and wellness
            journey in one place.
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div style={heroBadge}>
              🔥 {totalWorkoutCalories} Calories Burned
            </div>

            <div style={heroBadge}>
              🥗 {totalCalories} Calories Consumed
            </div>

            <div style={heroBadge}>
              🎯 {completedGoals} Goals Completed
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}

      <div
        className="fade-in"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            onClick={() =>
              setSelectedCard(card.key)
            }
            className="dashboard-card"
            style={{
              background: card.gradient,
              padding: "24px",
              borderRadius: "24px",
              color: "white",
              minHeight: "150px",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                marginBottom: "14px",
              }}
            >
              {card.icon}
            </div>

            <div
              style={{
                fontSize: "15px",
                opacity: 0.9,
                marginBottom: "8px",
              }}
            >
              {card.title}
            </div>

            <div
              style={{
                fontSize: "36px",
                fontWeight: "800",
              }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* DETAILS SECTION */}

      {selectedCard && (
        <div
          className="glass-card fade-in"
          style={detailCard}
        >
          {/* GOALS */}

          {selectedCard === "goals" && (
            <>
              <h2 style={sectionTitle}>
                🎯 Goal Details
              </h2>

              {goals.length === 0 ? (
                <p style={emptyText}>
                  No goals available
                </p>
              ) : (
                goals.map((goal, index) => {
                  const percentage =
                    (
                      goal.progress /
                      goal.target
                    ) * 100;

                  return (
                    <div
                      key={index}
                      style={listCard}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        <strong>
                          {goal.title}
                        </strong>

                        <span
                          style={{
                            color: "#ec4899",
                            fontWeight: "700",
                          }}
                        >
                          {percentage.toFixed(0)}%
                        </span>
                      </div>

                      <div style={progressBg}>
                        <div
                          style={{
                            ...progressFill,
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

          {/* FITNESS */}

          {selectedCard === "fitness" && (
            <>
              <h2 style={sectionTitle}>
                🔥 Workout History
              </h2>

              {workouts.length === 0 ? (
                <p style={emptyText}>
                  No workout history
                </p>
              ) : (
                workouts.map(
                  (workout, index) => (
                    <div
                      key={index}
                      style={listCard}
                    >
                      <div
                        style={{
                          fontWeight: "700",
                          marginBottom: "10px",
                        }}
                      >
                        🏋️ {workout.type}
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
                            workout.duration,
                            "mins",
                          ],

                          [
                            "📍",
                            workout.distance,
                            "km",
                          ],

                          [
                            "🔥",
                            workout.calories,
                            "cal",
                          ],
                        ].map(
                          ([icon, val, unit], i) => (
                            <span
                              key={i}
                              style={badge}
                            >
                              {icon} {val} {unit}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )
                )
              )}
            </>
          )}

          {/* NUTRITION */}

          {selectedCard === "nutrition" && (
            <>
              <h2 style={sectionTitle}>
                🥗 Nutrition Details
              </h2>

              {allFoods.length === 0 ? (
                <p style={emptyText}>
                  No food records
                </p>
              ) : (
                allFoods.map((food, index) => (
                  <div
                    key={index}
                    style={listCard}
                  >
                    <div
                      style={{
                        fontWeight: "700",
                        marginBottom: "10px",
                      }}
                    >
                      🍱 {food.name}
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
                          food.calories,
                          "kcal",
                        ],

                        [
                          "🥩",
                          food.protein,
                          "g",
                        ],

                        [
                          "🍚",
                          food.carbs,
                          "g",
                        ],

                        [
                          "🧈",
                          food.fat,
                          "g",
                        ],
                      ].map(
                        ([icon, val, unit], i) => (
                          <span
                            key={i}
                            style={badge}
                          >
                            {icon} {val}
                            {unit}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* WORKOUTS */}

          {selectedCard === "workouts" && (
            <>
              <h2 style={sectionTitle}>
                💪 Total Workouts
              </h2>

              <div
                style={{
                  fontSize: "60px",
                  fontWeight: "800",
                  color: "#8b5cf6",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                {totalWorkouts}
              </div>
            </>
          )}
        </div>
      )}

      {/* CHART */}

      <div
        className="glass-card fade-in"
        style={detailCard}
      >
        <h2 style={sectionTitle}>
          📊 Health Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 13 }}
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

      {/* RECENT ACTIVITY */}

      <div
        className="glass-card fade-in"
        style={detailCard}
      >
        <h2 style={sectionTitle}>
          ⚡ Recent Activity
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {[
            `✔ ${totalWorkouts} workouts tracked`,
            `✔ ${allFoods.length} meals logged`,
            `✔ ${completedGoals} goals completed`,
          ].map((item, index) => (
            <div
              key={index}
              className="activity-item"
              style={{
                background: "#fdf4ff",
                border: "1px solid #f5d0fe",
                borderRadius: "14px",
                padding: "16px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
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

const detailCard = {
  background: "white",
  borderRadius: "24px",
  padding: "28px",
  marginBottom: "28px",
  boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
};

const sectionTitle = {
  fontSize: "22px",
  fontWeight: "800",
  color: "#111827",
  marginBottom: "20px",
  marginTop: 0,
};

const listCard = {
  background: "#f9fafb",
  border: "1px solid #f3f4f6",
  borderRadius: "16px",
  padding: "18px",
  marginBottom: "14px",
};

const progressBg = {
  background: "#e5e7eb",
  borderRadius: "12px",
  height: "14px",
  overflow: "hidden",
};

const progressFill = {
  background:
    "linear-gradient(90deg, #ec4899, #8b5cf6)",
  height: "100%",
  borderRadius: "12px",
  transition: "width 0.5s ease",
};

const badge = {
  background: "white",
  border: "1px solid #e9d5ff",
  borderRadius: "8px",
  padding: "5px 12px",
  fontSize: "13px",
};

const emptyText = {
  color: "#6b7280",
  textAlign: "center",
  padding: "20px",
};

export default Dashboard;