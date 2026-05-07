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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Fitness() {

const currentUser =
  JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

const userId =
  currentUser.id;



  /* FITNESS GOAL */

  const [goalCalories,
    setGoalCalories] =
    useState(1000);

  /* EXERCISE INPUT */

  const [exercise,
    setExercise] =
    useState({

      type: "",

      duration: "",

      distance: "",

      calories: ""
    });

  /* LOAD SAVED WORKOUTS */

  const [workouts,
    setWorkouts] =
    useState(() => {

      const savedWorkouts =
        localStorage.getItem(
          `fitnessWorkouts_${userId}`
        );

      return savedWorkouts
        ? JSON.parse(
            savedWorkouts
          )
        : [];
    });

  /* SAVE WORKOUTS */

  useEffect(() => {

    localStorage.setItem(
      `fitnessWorkouts_${userId}`,

      JSON.stringify(
        workouts
      )
    );

  }, [workouts]);

  const [error,
    setError] =
    useState("");

  /* ADD WORKOUT */

  const handleAddWorkout =
    () => {

      if (

        !exercise.type ||

        !exercise.duration ||

        !exercise.distance ||

        !exercise.calories

      ) {

        setError(
          "Please fill all fields"
        );

        return;
      }

      setWorkouts([

        ...workouts,

        exercise
      ]);

      setExercise({

        type: "",

        duration: "",

        distance: "",

        calories: ""
      });

      setError("");

      toast.success(
        "Workout Added Successfully!"
      );
    };

  /* TOTALS */

  const totalCalories =
    workouts.reduce(

      (sum, w) =>

        sum +
        Number(
          w.calories
        ),

      0
    );

  const totalDuration =
    workouts.reduce(

      (sum, w) =>

        sum +
        Number(
          w.duration
        ),

      0
    );

  const totalDistance =
    workouts.reduce(

      (sum, w) =>

        sum +
        Number(
          w.distance
        ),

      0
    );

  /* PROGRESS */

  const progress =

    goalCalories > 0

      ? Math.min(

          (
            totalCalories /
            goalCalories
          ) * 100,

          100
        )

      : 0;

  /* NOTIFICATIONS */

  useEffect(() => {

    if (
      progress >= 100
    ) {

      toast.success(
        "Fitness Goal Achieved!"
      );
    }
    else if (
      progress >= 80
    ) {

      toast.info(
        `Only ${(100 - progress).toFixed(0)}% remaining`
      );
    }
    else if (
      progress >= 50
    ) {

      toast.info(
        `Great! You completed ${progress.toFixed(0)}%`
      );
    }

  }, [progress]);

  return (

    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px"
      }}
    >

      <ToastContainer />

      {/* TITLE */}

      <h1>
        Fitness Tracking
      </h1>

      {/* FITNESS GOAL */}

      <h2>
        Set Calories Burn Goal
      </h2>

      <input
        type="number"

        placeholder=
          "Calories Burn Goal"

        value={
          goalCalories
        }

        onChange={(e) =>
          setGoalCalories(
            Number(
              e.target.value
            )
          )
        }

        style={{
          width: "100%",

          padding:
            "10px",

          margin:
            "10px 0"
        }}
      />

      {/* ADD WORKOUT */}

      <h2>
        Add Exercise
      </h2>

      {/* EXERCISE TYPE */}

      <select
        value={
          exercise.type
        }

        onChange={(e) =>
          setExercise({

            ...exercise,

            type:
              e.target.value
          })
        }

        style={{
          width: "100%",

          padding:
            "10px",

          margin:
            "10px 0"
        }}
      >

        <option value="">
          Select Exercise
        </option>

        <option>
          Running
        </option>

        <option>
          Cycling
        </option>

        <option>
          Strength Training
        </option>

        <option>
          Yoga
        </option>

        <option>
          Swimming
        </option>

        <option>
          Walking
        </option>

      </select>

      {/* DURATION */}

      <input
        type="number"

        placeholder=
          "Duration (mins)"

        value={
          exercise.duration
        }

        onChange={(e) =>
          setExercise({

            ...exercise,

            duration:
              e.target.value
          })
        }

        style={{
          width: "100%",

          padding:
            "10px",

          margin:
            "10px 0"
        }}
      />

      {/* DISTANCE */}

      <input
        type="number"

        placeholder=
          "Distance (km)"

        value={
          exercise.distance
        }

        onChange={(e) =>
          setExercise({

            ...exercise,

            distance:
              e.target.value
          })
        }

        style={{
          width: "100%",

          padding:
            "10px",

          margin:
            "10px 0"
        }}
      />

      {/* CALORIES */}

      <input
        type="number"

        placeholder=
          "Calories Burned"

        value={
          exercise.calories
        }

        onChange={(e) =>
          setExercise({

            ...exercise,

            calories:
              e.target.value
          })
        }

        style={{
          width: "100%",

          padding:
            "10px",

          margin:
            "10px 0"
        }}
      />

      {error && (

        <p
          style={{
            color: "red"
          }}
        >
          {error}
        </p>
      )}

      <button
        onClick={
          handleAddWorkout
        }

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
        Add Exercise
      </button>

      {/* WORKOUT RECORDS */}

      <h2
        style={{
          marginTop:
            "30px"
        }}
      >
        Workout Records
      </h2>

      {workouts.length === 0 ? (

        <p>
          No workout records found
        </p>

      ) : (

        workouts.map(
          (w, i) => (

            <div
              key={i}

              style={{
                border:
                  "1px solid #ccc",

                padding:
                  "15px",

                margin:
                  "10px 0",

                borderRadius:
                  "10px",

                background:
                  "white"
              }}
            >

              <p>
                <b>
                  Exercise:
                </b>
                {" "}
                {w.type}
              </p>

              <p>
                Duration:
                {" "}
                {w.duration}
                {" "}
                mins
              </p>

              <p>
                Distance:
                {" "}
                {w.distance}
                {" "}
                km
              </p>

              <p>
                Calories Burned:
                {" "}
                {w.calories}
              </p>

            </div>
          )
        )
      )}

      {/* SUMMARY */}

      <h2>
        Fitness Summary
      </h2>

      <p>
        <b>
          Total Workouts:
        </b>
        {" "}
        {workouts.length}
      </p>

      <p>
        <b>
          Total Duration:
        </b>
        {" "}
        {totalDuration}
        {" "}
        mins
      </p>

      <p>
        <b>
          Total Distance:
        </b>
        {" "}
        {totalDistance}
        {" "}
        km
      </p>

      <p>
        <b>
          Total Calories Burned:
        </b>
        {" "}
        {totalCalories}
      </p>

      {/* PROGRESS BAR */}

      <h2>
        Calories Goal Progress
      </h2>

      <div
        style={{
          width: "100%",

          background:
            "#ddd",

          height: "20px",

          borderRadius:
            "10px"
        }}
      >

        <div
          style={{
            width:
              `${progress}%`,

            background:
              "#ec4899",

            height:
              "100%",

            borderRadius:
              "10px"
          }}
        />

      </div>

      <p>
        {progress.toFixed(0)}
        %
      </p>

      {/* RESET BUTTON */}

      {progress === 100 && (

        <div
          style={{
            marginTop:
              "20px"
          }}
        >

          <p
            style={{
              color:
                "green",

              fontWeight:
                "bold",

              marginBottom:
                "10px"
            }}
          >
            Goal Achieved 
          </p>

          <button
            onClick={() => {

              setWorkouts([]);

              toast.info(
                "Workout Records Reset Successfully"
              );
            }}

            style={{
              padding:
                "10px 20px",

              background:
                "red",

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
            Reset Records
          </button>

        </div>
      )}

      {/* CHART */}

      {workouts.length > 0 && (

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
            Calories Burn Chart
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={workouts}
            >

              <XAxis
                dataKey="type"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="calories"
                fill="#ec4899"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}

export default Fitness;