import {
  useState,
  useEffect
} from "react";

import {
  ToastContainer,
  toast
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Nutrition() {

  

const currentUser =
  JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

const userId =
  currentUser.id;

  /* GOAL TYPE */

  const [goalType,
    setGoalType] =
    useState("");

  /* CALORIE GOAL */

  const [goalCalories,
    setGoalCalories] =
    useState(2000);

  /* FOOD INPUT */

  const [food, setFood] =
    useState({

      name: "",

      calories: "",

      protein: "",

      carbs: "",

      fat: ""
    });

  /* LOAD SAVED FOODS */

  const [foods, setFoods] =
    useState(() => {

      const savedFoods =
        localStorage.getItem(
           `nutritionFoods_${userId}`
        );

      return savedFoods
        ? JSON.parse(
            savedFoods
          )
        : {
            "Weight Loss": [],
            "Muscle Gain": [],
            "Maintenance": []
          };
    });

  /* SAVE FOODS */

  useEffect(() => {

    localStorage.setItem(
      `nutritionFoods_${userId}`,

      JSON.stringify(
        foods
      )
    );

  }, [foods , userId]);

  const [error,
    setError] =
    useState("");

  /* ADD FOOD */

  const handleAddFood =
    () => {

      if (!goalType) {

        setError(
          "Please select a goal"
        );

        return;
      }

      if (

        !food.name ||

        !food.calories ||

        !food.protein ||

        !food.carbs ||

        !food.fat

      ) {

        setError(
          "Please fill all fields"
        );

        return;
      }

      setFoods((prev) => ({

        ...prev,

        [goalType]: [

          ...prev[goalType],

          food
        ]
      }));

      setFood({

        name: "",

        calories: "",

        protein: "",

        carbs: "",

        fat: ""
      });

      setError("");

      toast.success(
        "Food Added Successfully!"
      );
    };

  /* CURRENT RECORDS */

  const currentFoods =
    foods[goalType] || [];

  /* TOTALS */

  const totalCalories =
    currentFoods.reduce(

      (sum, f) =>

        sum +
        Number(
          f.calories
        ),

      0
    );

  const totalProtein =
    currentFoods.reduce(

      (sum, f) =>

        sum +
        Number(
          f.protein
        ),

      0
    );

  const totalCarbs =
    currentFoods.reduce(

      (sum, f) =>

        sum +
        Number(
          f.carbs
        ),

      0
    );

  const totalFat =
    currentFoods.reduce(

      (sum, f) =>

        sum +
        Number(
          f.fat
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

  /* SMART NOTIFICATIONS */

  useEffect(() => {

    if (
  progress >= 100
) {

  toast.success(
    `${goalType} Goal Achieved!`
  );
}
    else if (
      progress >= 80
    ) {

      toast.info(
        `Only ${(100 - progress).toFixed(0)}% calories remaining`
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
        maxWidth: "700px",
        margin: "auto",
        padding: "20px"
      }}
    >

      <ToastContainer />

      {/* TITLE */}

      <h1 style={{textAlign: "center"}}>
        NUTRITION PLANNING
      </h1>

      {/* GOAL SELECTION */}

      <h2>
        Select Goal
      </h2>

      <div
        style={{
          display: "flex",

          gap: "10px",

          marginBottom:
            "20px",

          flexWrap:
            "wrap"
        }}
      >

        <button
          onClick={() =>
            setGoalType(
              "Weight Loss"
            )
          }
        >
          Weight Loss
        </button>

        <button
          onClick={() =>
            setGoalType(
              "Muscle Gain"
            )
          }
        >
          Muscle Gain
        </button>

        <button
          onClick={() =>
            setGoalType(
              "Maintenance"
            )
          }
        >
          Maintenance
        </button>

      </div>

      <p>

        <b>
          Current Goal:
        </b>

        {" "}

        {goalType ||
          "Not Selected"}

      </p>

      {/* CALORIE GOAL */}

      <input
        type="number"

        placeholder=
          "Set Daily Calories Goal"

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

      {/* FOOD FORM */}

      <h2>
        Add Food
      </h2>

      <input
        placeholder=
          "Food Name"

        value={food.name}

        onChange={(e) =>
          setFood({

            ...food,

            name:
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

      <input
        type="number"

        placeholder=
          "Calories"

        value={
          food.calories
        }

        onChange={(e) =>
          setFood({

            ...food,

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

      <input
        type="number"

        placeholder=
          "Protein (g)"

        value={
          food.protein
        }

        onChange={(e) =>
          setFood({

            ...food,

            protein:
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

      <input
        type="number"

        placeholder=
          "Carbs (g)"

        value={
          food.carbs
        }

        onChange={(e) =>
          setFood({

            ...food,

            carbs:
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

      <input
        type="number"

        placeholder=
          "Fat (g)"

        value={food.fat}

        onChange={(e) =>
          setFood({

            ...food,

            fat:
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
          handleAddFood
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
        Add Food
      </button>

      {/* FOOD RECORDS */}

      <h2
        style={{
          marginTop:
            "30px"
        }}
      >

        {goalType}
        {" "}
        Food Records

      </h2>

      {currentFoods.length === 0 ? (

        <p>
          No food records found
        </p>

      ) : (

        currentFoods.map(
          (f, i) => (

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
                  Food:
                </b>
                {" "}
                {f.name}
              </p>

              <p>
                Calories:
                {" "}
                {f.calories}
              </p>

              <p>
                Protein:
                {" "}
                {f.protein}g
              </p>

              <p>
                Carbs:
                {" "}
                {f.carbs}g
              </p>

              <p>
                Fat:
                {" "}
                {f.fat}g
              </p>

            </div>
          )
        )
      )}

      {/* TOTALS */}

      <h2>
        Total Nutrition
      </h2>

      <p>
        <b>
          Calories:
        </b>
        {" "}
        {totalCalories}
      </p>

      <p>
        <b>
          Protein:
        </b>
        {" "}
        {totalProtein}g
      </p>

      <p>
        <b>
          Carbs:
        </b>
        {" "}
        {totalCarbs}g
      </p>

      <p>
        <b>
          Fat:
        </b>
        {" "}
        {totalFat}g
      </p>

      {/* PROGRESS */}

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
              "orange",

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

      {progress === 100 && (

  <div
    style={{
      marginTop: "20px"
    }}
  >

    <p
      style={{
        color: "green",
        fontWeight: "bold",
        marginBottom: "10px"
      }}
    >
      Goal Achieved 
    </p>

    <button
      onClick={() => {

        setFoods((prev) => ({

          ...prev,

          [goalType]: []
        }));

        toast.info(
          `${goalType} Records Reset Successfully`
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

    </div>
  );
}

export default Nutrition;