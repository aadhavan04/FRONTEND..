import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBullseye } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Goals() {
  /* CURRENT USER */

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser.id;

  /* GOALS STATE */

  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem(`goals_${userId}`);

    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  /* SAVE GOALS */

  useEffect(() => {
    localStorage.setItem(`goals_${userId}`, JSON.stringify(goals));
  }, [goals, userId]);

  /* NEW GOAL */

  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
  });

  /* ADD GOAL */

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target) {
      toast.error("Please fill all fields");
      return;
    }

    const updatedGoals = [
      ...goals,
      {
        title: newGoal.title,
        target: Number(newGoal.target),
        progress: 0,
        isUpdating: false,
        completedInput: "",
      },
    ];

    setGoals(updatedGoals);

    setNewGoal({
      title: "",
      target: "",
    });

    toast.success("Goal Added Successfully!");
  };

  /* OPEN UPDATE */

  const openUpdate = (index) => {
    const updatedGoals = goals.map((goal, i) => {
      if (i === index) {
        return {
          ...goal,
          isUpdating: true,
        };
      }

      return goal;
    });

    setGoals(updatedGoals);
  };

  /* HANDLE INPUT */

  const handleProgressInput = (index, value) => {
    const updatedGoals = goals.map((goal, i) => {
      if (i === index) {
        return {
          ...goal,
          completedInput: value,
        };
      }

      return goal;
    });

    setGoals(updatedGoals);
  };

  /* SAVE PROGRESS */

  const saveProgress = (index) => {
    const updatedGoals = goals.map((goal, i) => {
      if (i === index) {
        const completed = Number(goal.completedInput);

        if (isNaN(completed)) {
          toast.error("Enter valid number");

          return goal;
        }

        return {
          ...goal,
          progress: completed,
          isUpdating: false,
          completedInput: "",
        };
      }

      return goal;
    });

    setGoals(updatedGoals);

    const updatedGoal = updatedGoals[index];

    const percentage =
      (updatedGoal.progress / updatedGoal.target) * 100;

    const remaining = 100 - percentage;

    if (percentage >= 100) {
      toast.success(`${updatedGoal.title} Goal Completed!`);
    } else if (percentage >= 90) {
      toast.info(`Only ${remaining.toFixed(0)}% left`);
    } else if (percentage >= 50) {
      toast.info(`${percentage.toFixed(0)}% completed`);
    } else {
      toast.info(`📈 ${remaining.toFixed(0)}% remaining`);
    }
  };

  /* RESET ALL GOALS */

  const resetAllGoals = () => {
    setGoals([]);

    toast.success("All Goals Reset Successfully!");
  };

  return (
    <div
      className="fade-in"
      style={{
        maxWidth: "900px",
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

        .goal-card {
          transition: all 0.25s ease;
        }

        .goal-card:hover {
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

      {/* HEADER */}

      <div
        className="hover-card"
        style={{
          background: "linear-gradient(135deg, #f59e0b, #ec4899)",
          borderRadius: "20px",
          padding: "28px 32px",
          marginBottom: "28px",
          color: "white",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: "800",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaBullseye />
          Goal Setting
        </h1>

        <p style={{ margin: "6px 0 0", opacity: 0.85 }}>
          Set your goals and track your progress easily
        </p>
      </div>

      {/* ADD GOAL CARD */}

      <div
        className="hover-card"
        style={card}
      >
        <h2 style={sectionTitle}>🎯 Add New Goal</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
          }}
        >
          <div>
            <label style={label}>Goal Title</label>

            <input
              type="text"
              placeholder="e.g. Daily Steps"
              value={newGoal.title}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  title: e.target.value,
                })
              }
              style={inputStyle}
              className="input-hover"
            />
          </div>

          <div>
            <label style={label}>Target Value</label>

            <input
              type="number"
              placeholder="e.g. 10000"
              value={newGoal.target}
              onChange={(e) =>
                setNewGoal({
                  ...newGoal,
                  target: e.target.value,
                })
              }
              style={inputStyle}
              className="input-hover"
            />
          </div>
        </div>

        <button
          onClick={addGoal}
          style={primaryBtn}
          className="primary-btn-hover"
        >
          Add Goal
        </button>
      </div>

      {/* GOALS */}

      {goals.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          {goals.map((goal, index) => {
            const percentage =
              (goal.progress / goal.target) * 100;

            return (
              <div
                key={index}
                className="goal-card"
                style={{
                  background: "#ffffff",
                  borderRadius: "18px",
                  padding: "22px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                  border: "1px solid #f3e8ff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#111827",
                    }}
                  >
                    {goal.title}
                  </h2>

                  <span
                    style={{
                      background: "#fdf4ff",
                      color: "#ec4899",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    {percentage.toFixed(0)}%
                  </span>
                </div>

                <p
                  style={{
                    color: "#6b7280",
                    marginBottom: "14px",
                    fontSize: "14px",
                  }}
                >
                  {goal.progress} / {goal.target} Completed
                </p>

                {/* PROGRESS BAR */}

                <div
                  style={{
                    background: "#f3f4f6",
                    borderRadius: "12px",
                    height: "16px",
                    overflow: "hidden",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: `${percentage}%`,
                      background:
                        "linear-gradient(90deg, #ec4899, #8b5cf6)",
                      height: "100%",
                      borderRadius: "12px",
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>

                {!goal.isUpdating ? (
                  <button
                    onClick={() => openUpdate(index)}
                    className="primary-btn-hover"
                    style={{
                      ...secondaryBtn,
                      marginTop: "16px",
                    }}
                  >
                    Update Progress
                  </button>
                ) : (
                  <div style={{ marginTop: "16px" }}>
                    <input
                      type="number"
                      placeholder="Enter completed value"
                      value={goal.completedInput}
                      onChange={(e) =>
                        handleProgressInput(
                          index,
                          e.target.value
                        )
                      }
                      style={inputStyle}
                      className="input-hover"
                    />

                    <button
                      onClick={() => saveProgress(index)}
                      style={primaryBtn}
                      className="primary-btn-hover"
                    >
                      Save Progress
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* CHART */}

      {goals.length > 0 && (
        <div
          className="hover-card"
          style={card}
        >
          <h2 style={sectionTitle}>
            📊 Goal Progress Chart
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={goals}>
              <XAxis
                dataKey="title"
                tick={{ fontSize: 12 }}
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="progress"
                fill="#ec4899"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* RESET BUTTON */}

          <div
            style={{
              marginTop: "22px",
              textAlign: "center",
            }}
          >
            <button
              onClick={resetAllGoals}
              className="primary-btn-hover"
              style={{
                ...primaryBtn,
                width: "auto",
                padding: "12px 28px",
                background: "#ef4444",
              }}
            >
              Reset All Goals
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */

const card = {
  background: "white",
  borderRadius: "18px",
  padding: "24px",
  marginBottom: "24px",
  boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
};

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#111827",
  marginBottom: "18px",
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
  background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
};

const secondaryBtn = {
  width: "100%",
  padding: "12px",
  background: "#111827",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
};

export default Goals;