import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

function UpdateProgress() {

  const navigate =
    useNavigate();

  const [target,
    setTarget] =
    useState("");

  const [completed,
    setCompleted] =
    useState("");

  const percentage =
    target > 0
      ? (
          completed / target
        ) * 100
      : 0;

  const handleSave = () => {

    const progressData = {

      target,

      completed,

      percentage

    };

    localStorage.setItem(
      "goalProgress",

      JSON.stringify(
        progressData
      )
    );

    navigate(
      "/home/goals"
    );
  };

  return (

    <div>

      <h1
        style={{
          marginBottom:
            "20px"
        }}
      >
        Update Progress
      </h1>

      {/* TARGET */}

      <input
        type="number"

        placeholder=
          "Enter Total Target"

        value={target}

        onChange={(e) =>
          setTarget(
            e.target.value
          )
        }

        style={{
          width: "100%",

          padding: "12px",

          marginBottom:
            "15px"
        }}
      />

      {/* COMPLETED */}

      <input
        type="number"

        placeholder=
          "Enter Completed Value"

        value={completed}

        onChange={(e) =>
          setCompleted(
            e.target.value
          )
        }

        style={{
          width: "100%",

          padding: "12px",

          marginBottom:
            "20px"
        }}
      />

      {/* PROGRESS BAR */}

      <div
        style={{
          width: "100%",

          height: "20px",

          background:
            "#ddd",

          borderRadius:
            "20px",

          overflow:
            "hidden"
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
            "15px",

          fontWeight:
            "bold"
        }}
      >

        {percentage.toFixed(0)}
        % Completed

      </p>

      <button
        onClick={handleSave}

        style={{
          marginTop:
            "20px",

          padding:
            "10px 20px",

          background:
            "#111827",

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
        Save Progress
      </button>

    </div>

  );
}

export default UpdateProgress;