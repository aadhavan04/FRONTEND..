import {
  useEffect,
  useState
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

function Dashboard() {

  const currentUser =
  JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

const userId =
  currentUser.id;

  /* STATES */

  const [goals, setGoals] =
    useState([]);

  const [nutrition,
    setNutrition] =
    useState({

      "Weight Loss": [],
      "Muscle Gain": [],
      "Maintenance": []
    });

  const [workouts,
    setWorkouts] =
    useState([]);

  const [selectedCard,
    setSelectedCard] =
    useState("");

  /* LOAD LOCAL STORAGE DATA */

  useEffect(() => {

    const savedGoals =
      localStorage.getItem(
        `goals_${userId}`
      );

    const savedNutrition =
      localStorage.getItem(
        `nutritionFoods_${userId}`
      );

    const savedWorkouts =
      localStorage.getItem(
        `fitnessWorkouts_${userId}`
      );

    if (savedGoals) {

      setGoals(
        JSON.parse(
          savedGoals
        )
      );
    }

    if (savedNutrition) {

      setNutrition(
        JSON.parse(
          savedNutrition
        )
      );
    }

    if (savedWorkouts) {

      setWorkouts(
        JSON.parse(
          savedWorkouts
        )
      );
    }

  }, []);

  /* GOAL SUMMARY */

  const completedGoals =
    goals.filter(
      (goal) => {

        const percentage =
          (
            goal.progress /
            goal.target
          ) * 100;

        return percentage >= 100;
      }
    ).length;

  /* NUTRITION SUMMARY */

  const allFoods = [

    ...nutrition[
      "Weight Loss"
    ],

    ...nutrition[
      "Muscle Gain"
    ],

    ...nutrition[
      "Maintenance"
    ]
  ];

  const totalCalories =
    allFoods.reduce(

      (sum, food) =>

        sum +
        Number(
          food.calories
        ),

      0
    );

  /* FITNESS SUMMARY */

  const totalWorkoutCalories =
    workouts.reduce(

      (sum, workout) =>

        sum +
        Number(
          workout.calories
        ),

      0
    );

  const totalWorkouts =
    workouts.length;

  /* NOTIFICATIONS */

  useEffect(() => {

    if (
      completedGoals > 0
    ) {

      toast.success(
        `${completedGoals} Goal(s) Completed!`
      );
    }

    if (
      totalWorkoutCalories >= 1000
    ) {

      toast.info(
        "Amazing calorie burn progress!"
      );
    }

    if (
      totalCalories >= 2000
    ) {

      toast.info(
        "Nutrition intake progressing well!"
      );
    }

  }, [

    completedGoals,

    totalWorkoutCalories,

    totalCalories
  ]);

  /* CHART DATA */

  const chartData = [

    {
      name:
        "Nutrition",

      calories:
        totalCalories
    },

    {
      name:
        "Fitness",

      calories:
        totalWorkoutCalories
    }
  ];

  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      <ToastContainer />

      {/* WELCOME */}

      <div
        style={{
          background:
            "#ec4899",

          color:
            "white",

          padding:
            "30px",

          borderRadius:
            "20px",

          marginBottom:
            "30px"
        }}
      >

        <h1
          style={{
            fontSize:
              "36px"
          }}
        >
          Welcome Back 👋
        </h1>

        <p>
          Track your health and wellness journey
        </p>

      </div>

      {/* SUMMARY CARDS */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

          gap: "20px"
        }}
      >

        {/* GOALS CARD */}

        <div
          onClick={() =>
            setSelectedCard(
              "goals"
            )
          }

          style={{
            background:
              "white",

            padding:
              "20px",

            borderRadius:
              "15px",

            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)",

            cursor:
              "pointer"
          }}
        >

          <h2>
            Goals Completed
          </h2>

          <h1>
            {completedGoals}
          </h1>

        </div>

        {/* NUTRITION CARD */}

        <div
          onClick={() =>
            setSelectedCard(
              "nutrition"
            )
          }

          style={{
            background:
              "white",

            padding:
              "20px",

            borderRadius:
              "15px",

            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)",

            cursor:
              "pointer"
          }}
        >

          <h2>
            Calories Consumed
          </h2>

          <h1>
            {totalCalories}
          </h1>

        </div>

        {/* FITNESS CARD */}

        <div
          onClick={() =>
            setSelectedCard(
              "fitness"
            )
          }

          style={{
            background:
              "white",

            padding:
              "20px",

            borderRadius:
              "15px",

            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)",

            cursor:
              "pointer"
          }}
        >

          <h2>
            Calories Burned
          </h2>

          <h1>
            {totalWorkoutCalories}
          </h1>

        </div>

        {/* WORKOUT CARD */}

        <div
          onClick={() =>
            setSelectedCard(
              "workouts"
            )
          }

          style={{
            background:
              "white",

            padding:
              "20px",

            borderRadius:
              "15px",

            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)",

            cursor:
              "pointer"
          }}
        >

          <h2>
            Total Workouts
          </h2>

          <h1>
            {totalWorkouts}
          </h1>

        </div>

      </div>

      {/* DETAILS SECTION */}

      {selectedCard === "goals" && (

        <div
          style={{
            background:
              "white",

            padding:
              "20px",

            marginTop:
              "30px",

            borderRadius:
              "15px",

            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h2>
            Goal Details
          </h2>

          {goals.length === 0 ? (

            <p>
              No Goals Found
            </p>

          ) : (

            goals.map(
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
                      marginBottom:
                        "15px",

                      borderBottom:
                        "1px solid #ddd",

                      paddingBottom:
                        "10px"
                    }}
                  >

                    <p>
                      <b>
                        {goal.title}
                      </b>
                    </p>

                    <p>
                      Progress:
                      {" "}
                      {goal.progress}
                      {" / "}
                      {goal.target}
                    </p>

                    <p>
                      {percentage.toFixed(
                        0
                      )}
                      %
                    </p>

                  </div>
                );
              }
            )
          )}

        </div>
      )}

      {/* NUTRITION DETAILS */}

      {selectedCard === "nutrition" && (

        <div
          style={{
            background:
              "white",

            padding:
              "20px",

            marginTop:
              "30px",

            borderRadius:
              "15px",

            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h2>
            Nutrition Details
          </h2>

          {allFoods.length === 0 ? (

            <p>
              No Nutrition Records
            </p>

          ) : (

            allFoods.map(
              (food, index) => (

                <div
                  key={index}

                  style={{
                    marginBottom:
                      "15px",

                    borderBottom:
                      "1px solid #ddd",

                    paddingBottom:
                      "10px"
                  }}
                >

                  <p>
                    <b>
                      {food.name}
                    </b>
                  </p>

                  <p>
                    Calories:
                    {" "}
                    {food.calories}
                  </p>

                  <p>
                    Protein:
                    {" "}
                    {food.protein}g
                  </p>

                </div>
              )
            )
          )}

        </div>
      )}

      {/* FITNESS DETAILS */}

      {selectedCard === "fitness" && (

        <div
          style={{
            background:
              "white",

            padding:
              "20px",

            marginTop:
              "30px",

            borderRadius:
              "15px",

            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h2>
            Calories Burn Details
          </h2>

          {workouts.length === 0 ? (

            <p>
              No Workout Records
            </p>

          ) : (

            workouts.map(
              (workout, index) => (

                <div
                  key={index}

                  style={{
                    marginBottom:
                      "15px",

                    borderBottom:
                      "1px solid #ddd",

                    paddingBottom:
                      "10px"
                  }}
                >

                  <p>
                    <b>
                      {workout.type}
                    </b>
                  </p>

                  <p>
                    Calories Burned:
                    {" "}
                    {workout.calories}
                  </p>

                </div>
              )
            )
          )}

        </div>
      )}

      {/* WORKOUT DETAILS */}

      {selectedCard === "workouts" && (

        <div
          style={{
            background:
              "white",

            padding:
              "20px",

            marginTop:
              "30px",

            borderRadius:
              "15px",

            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h2>
            Workout History
          </h2>

          {workouts.length === 0 ? (

            <p>
              No Workout History
            </p>

          ) : (

            workouts.map(
              (workout, index) => (

                <div
                  key={index}

                  style={{
                    marginBottom:
                      "15px",

                    borderBottom:
                      "1px solid #ddd",

                    paddingBottom:
                      "10px"
                  }}
                >

                  <p>
                    <b>
                      {workout.type}
                    </b>
                  </p>

                  <p>
                    Duration:
                    {" "}
                    {workout.duration}
                    {" "}
                    mins
                  </p>

                  <p>
                    Distance:
                    {" "}
                    {workout.distance}
                    {" "}
                    km
                  </p>

                </div>
              )
            )
          )}

        </div>
      )}

      {/* ANALYTICS CHART */}

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
          Health Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={chartData}
          >

            <XAxis
              dataKey="name"
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

      {/* RECENT ACTIVITY */}

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
          Recent Activity
        </h2>

        <ul>

          <li>
            ✔ {totalWorkouts}
            {" "}
            workouts tracked
          </li>

          <li>
            ✔ {allFoods.length}
            {" "}
            meals logged
          </li>

          <li>
            ✔ {completedGoals}
            {" "}
            goals completed
          </li>

        </ul>

      </div>

    </div>
  );
}

export default Dashboard;