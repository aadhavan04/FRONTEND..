import {
  useState,
  useEffect
} from "react";

import {
  ToastContainer,
  toast
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  FaBullseye
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Goals() {

  /* CURRENT USER */

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const userId =
    currentUser.id;

  /* GOALS STATE */

  const [goals, setGoals] =
    useState(() => {

      const savedGoals =
        localStorage.getItem(
          `goals_${userId}`
        );

      return savedGoals
        ? JSON.parse(savedGoals)
        : [];
    });

  /* SAVE GOALS */

  useEffect(() => {

    localStorage.setItem(

      `goals_${userId}`,

      JSON.stringify(goals)
    );

  }, [goals, userId]);

  /* NEW GOAL */

  const [newGoal,
    setNewGoal] =
    useState({

      title: "",

      target: ""
    });

  /* ADD GOAL */

  const addGoal = () => {

    if (

      !newGoal.title ||

      !newGoal.target

    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    const updatedGoals = [

      ...goals,

      {

        title:
          newGoal.title,

        target:
          Number(
            newGoal.target
          ),

        progress: 0,

        isUpdating: false,

        completedInput: ""
      }
    ];

    setGoals(updatedGoals);

    setNewGoal({

      title: "",

      target: ""
    });

    toast.success(
      "Goal Added Successfully!"
    );
  };

  /* OPEN UPDATE */

  const openUpdate = (
    index
  ) => {

    const updatedGoals =
      goals.map(
        (goal, i) => {

          if (i === index) {

            return {

              ...goal,

              isUpdating: true
            };
          }

          return goal;
        }
      );

    setGoals(updatedGoals);
  };

  /* HANDLE INPUT */

  const handleProgressInput = (
    index,
    value
  ) => {

    const updatedGoals =
      goals.map(
        (goal, i) => {

          if (i === index) {

            return {

              ...goal,

              completedInput:
                value
            };
          }

          return goal;
        }
      );

    setGoals(updatedGoals);
  };

  /* SAVE PROGRESS */

  const saveProgress = (
    index
  ) => {

    const updatedGoals =
      goals.map(
        (goal, i) => {

          if (i === index) {

            const completed =
              Number(
                goal.completedInput
              );

            if (
              isNaN(completed)
            ) {

              toast.error(
                "Enter valid number"
              );

              return goal;
            }

            return {

              ...goal,

              progress:
                completed,

              isUpdating:
                false,

              completedInput:
                ""
            };
          }

          return goal;
        }
      );

    setGoals(updatedGoals);

    const updatedGoal =
      updatedGoals[index];

    const percentage =
      (
        updatedGoal.progress /
        updatedGoal.target
      ) * 100;

    const remaining =
      100 - percentage;

    if (percentage >= 100) {

      toast.success(
        `${updatedGoal.title} Goal Completed!`
      );
    }
    else if (
      percentage >= 90
    ) {

      toast.info(
        `Only ${remaining.toFixed(0)}% left`
      );
    }
    else if (
      percentage >= 50
    ) {

      toast.info(
        `${percentage.toFixed(0)}% completed`
      );
    }
    else {

      toast.info(
        `📈 ${remaining.toFixed(0)}% remaining`
      );
    }
  };

  return (

    <div>

      <ToastContainer />

      {/* TITLE */}

      <h1
        style={{
          fontSize: "32px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >

        <FaBullseye />

        Goal Setting

      </h1>

      {/* ADD GOAL */}

      <div
        style={{
          background:
            "white",

          padding:
            "20px",

          borderRadius:
            "15px",

          marginBottom:
            "20px",

          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h2>
          Add New Goal
        </h2>

        <input
          type="text"

          placeholder=
            "Goal Title"

          value={
            newGoal.title
          }

          onChange={(e) =>
            setNewGoal({

              ...newGoal,

              title:
                e.target.value
            })
          }

          style={{
            width: "50%",
            padding: "10px",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="number"

          placeholder=
            "Target Value"

          value={
            newGoal.target
          }

          onChange={(e) =>
            setNewGoal({

              ...newGoal,

              target:
                e.target.value
            })
          }

          style={{
            width: "50%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <button
          onClick={addGoal}

          style={{
            padding:
              "10px 20px",

            background:
              "#ec4899",

            color:
              "white",

            border:
              "none",

            borderRadius:
              "10px",

            cursor:
              "pointer"
          }}
        >
          Add Goal
        </button>

      </div>

      {/* GOALS */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",

          gap: "20px"
        }}
      >

        {goals.map(
          (goal, index) => {

            const percentage =
              (
                goal.progress /
                goal.target
              ) * 100;

            return (

              <div
                key={index}

                style={{
                  background:
                    "white",

                  padding:
                    "20px",

                  borderRadius:
                    "15px",

                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.1)"
                }}
              >

                <h2>
                  {goal.title}
                </h2>

                <p>
                  {goal.progress}
                  {" / "}
                  {goal.target}
                </p>

                {/* PROGRESS BAR */}

                <div
                  style={{
                    width:
                      "100%",

                    height:
                      "15px",

                    background:
                      "#e5e7eb",

                    borderRadius:
                      "20px",

                    overflow:
                      "hidden",

                    marginTop:
                      "10px"
                  }}
                >

                  <div
                    style={{
                      width:
                        `${percentage}%`,

                      height:
                        "100%",

                      background:
                        "#ec4899"
                    }}
                  />

                </div>

                <p
                  style={{
                    marginTop:
                      "10px",

                    fontWeight:
                      "bold"
                  }}
                >

                  {percentage.toFixed(0)}
                  % Completed

                </p>

                {/* UPDATE */}

                {!goal.isUpdating ? (

                  <button
                    onClick={() =>
                      openUpdate(index)
                    }

                    style={{
                      marginTop:
                        "15px",

                      padding:
                        "10px 15px",

                      background:
                        "#111827",

                      color:
                        "white",

                      border:
                        "none",

                      borderRadius:
                        "8px",

                      cursor:
                        "pointer"
                    }}
                  >
                    Update Progress
                  </button>

                ) : (

                  <div
                    style={{
                      marginTop:
                        "15px"
                    }}
                  >

                    <input
                      type="number"

                      placeholder=
                        "Completed Value"

                      value={
                        goal.completedInput
                      }

                      onChange={(e) =>
                        handleProgressInput(
                          index,
                          e.target.value
                        )
                      }

                      style={{
                        width:
                          "100%",

                        padding:
                          "10px",

                        marginBottom:
                          "10px"
                      }}
                    />

                    <button
                      onClick={() =>
                        saveProgress(
                          index
                        )
                      }

                      style={{
                        padding:
                          "10px 15px",

                        background:
                          "#ec4899",

                        color:
                          "white",

                        border:
                          "none",

                        borderRadius:
                          "8px",

                        cursor:
                          "pointer"
                      }}
                    >
                      Save Progress
                    </button>

                  </div>
                )}

              </div>
            );
          }
        )}

      </div>

      {/* CHART */}

      {goals.length > 0 && (

        <div
          style={{
            background:
              "white",

            padding:
              "20px",

            marginTop:
              "40px",

            borderRadius:
              "15px",

            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h2>
            Goal Progress Chart
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={goals}
            >

              <XAxis
                dataKey="title"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="progress"
                fill="#ec4899"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}

export default Goals;