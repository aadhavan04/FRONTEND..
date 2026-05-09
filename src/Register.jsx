import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgImage from "./assets/H&W.jpg";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    try {
      await axios.post(
        "https://backend-wh-nudx.onrender.com/api/auth/register",
        data
      );

      setError("");

      alert(
        "Registered Successfully! Please login."
      );

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* ANIMATIONS */}

      <style>{`
        .glass-card {
          animation: fadeInUp 0.8s ease;
          transition: all 0.35s ease;
        }

        .glass-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        }

        .input-hover {
          transition: all 0.25s ease;
        }

        .input-hover:focus {
          border: 1px solid rgba(236,72,153,0.8) !important;
          box-shadow: 0 0 0 4px rgba(236,72,153,0.18);
          background: rgba(255,255,255,0.2) !important;
          transform: scale(1.01);
        }

        .btn-hover {
          transition: all 0.25s ease;
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          opacity: 0.96;
          box-shadow: 0 12px 24px rgba(236,72,153,0.28);
        }

        .link-hover {
          transition: all 0.2s ease;
        }

        .link-hover:hover {
          color: white !important;
        }

        .floating-bg {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.35;
          animation: floatAnim 6s ease-in-out infinite;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatAnim {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-18px);
          }

          100% {
            transform: translateY(0px);
          }
        }
      `}</style>

      {/* GLOW EFFECTS */}

      <div
        className="floating-bg"
        style={{
          width: "260px",
          height: "260px",
          background: "#ec4899",
          top: "10%",
          left: "10%",
        }}
      />

      <div
        className="floating-bg"
        style={{
          width: "220px",
          height: "220px",
          background: "#8b5cf6",
          bottom: "10%",
          right: "12%",
          animationDelay: "2s",
        }}
      />

      {/* REGISTER CARD */}

      <div
        className="glass-card"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
          borderRadius: "24px",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "420px",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.3)",
          border:
            "1px solid rgba(255,255,255,0.2)",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "26px",
            fontWeight: "800",
            letterSpacing: "2px",
            marginBottom: "4px",
          }}
        >
          💪 HEALTH & WELLNESS
        </h1>

        <p
          style={{
            color:
              "rgba(255,255,255,0.7)",
            marginBottom: "32px",
            fontSize: "14px",
          }}
        >
          Start your wellness journey today
        </p>

        <h2
          style={{
            color: "white",
            fontSize: "20px",
            marginBottom: "24px",
            fontWeight: "600",
          }}
        >
          Create Account 🚀
        </h2>

        {/* NAME */}

        <div
          style={{
            marginBottom: "16px",
            textAlign: "left",
          }}
        >
          <label style={labelStyle}>
            Full Name
          </label>

          <input
            placeholder="Enter your name"
            value={data.name}
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value,
              })
            }
            style={inputStyle}
            className="input-hover"
          />
        </div>

        {/* EMAIL */}

        <div
          style={{
            marginBottom: "16px",
            textAlign: "left",
          }}
        >
          <label style={labelStyle}>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            style={inputStyle}
            className="input-hover"
          />
        </div>

        {/* PASSWORD */}

        <div
          style={{
            marginBottom: "24px",
            textAlign: "left",
          }}
        >
          <label style={labelStyle}>
            Password
          </label>

          <div style={{ position: "relative" }}>
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create a password"
              value={data.password}
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
              style={{
                ...inputStyle,
                paddingRight: "48px",
              }}
              className="input-hover"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                background:
                  "transparent",
                border: "none",
                color: "black",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div
            style={{
              background:
                "rgba(239,68,68,0.2)",
              border:
                "1px solid rgba(239,68,68,0.5)",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "16px",
            }}
          >
            <p
              style={{
                color: "#fca5a5",
                fontSize: "14px",
                margin: 0,
              }}
            >
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* REGISTER BUTTON */}

        <button
          onClick={handleRegister}
          disabled={loading}
          style={primaryBtn}
          className="btn-hover"
        >
          {loading
            ? "Creating account..."
            : "Create Account →"}
        </button>

        {/* LOGIN LINK */}

        <p
          style={{
            color:
              "rgba(255,255,255,0.7)",
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="link-hover"
            style={{
              color: "#f9a8d4",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const labelStyle = {
  color: "rgba(255,255,255,0.8)",
  fontSize: "13px",
  fontWeight: "600",
  display: "block",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "12px",
  border:
    "1px solid rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.15)",
  color: "white",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const primaryBtn = {
  width: "100%",
  padding: "13px",
  background:
    "linear-gradient(135deg, #ec4899, #8b5cf6)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  letterSpacing: "0.5px",
};

export default Register;