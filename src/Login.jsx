import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgImage from "./assets/H&W.jpg";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://backend-wh-nudx.onrender.com/api/auth/login",
        data
      );
      setError("");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home/dashboard");
    } catch {
      setError("Email or Password Incorrect");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setData({ email: "test@hw.com", password: "test@123" });
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
        animation: "bgZoom 12s ease-in-out infinite alternate",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }

        .glass-card {
          animation: fadeInUp 0.8s ease;
          transition: all 0.35s ease;
        }

        .glass-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        }

        .input-field {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.15);
          color: white;
          font-size: 15px;
          outline: none;
          box-sizing: border-box;
          transition: all 0.25s ease;
          display: block;
        }

        .input-field::placeholder {
          color: rgba(255,255,255,0.45);
        }

        .input-field:focus {
          border: 1px solid rgba(236,72,153,0.8) !important;
          box-shadow: 0 0 0 4px rgba(236,72,153,0.18);
          background: rgba(255,255,255,0.22) !important;
          transform: scale(1.01);
        }

        .input-password {
          width: 100%;
          padding: 12px 48px 12px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.15);
          color: white;
          font-size: 15px;
          outline: none;
          box-sizing: border-box;
          transition: all 0.25s ease;
          display: block;
        }

        .input-password::placeholder {
          color: rgba(255,255,255,0.45);
        }

        .input-password:focus {
          border: 1px solid rgba(236,72,153,0.8) !important;
          box-shadow: 0 0 0 4px rgba(236,72,153,0.18);
          background: rgba(255,255,255,0.22) !important;
          transform: scale(1.01);
        }

        .btn-primary {
          margin: 0 auto;
          display: flex;
          width: flex;
          padding: 13px;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
          transition: all 0.25s ease;
          display: block;
          box-sizing: border-box;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          opacity: 0.96;
          box-shadow: 0 12px 24px rgba(236,72,153,0.28);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-demo {
          margin: 0 auto;
          width: flex;
          padding: 11px;
          background: rgba(255,255,255,0.15);
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          display: block;
          box-sizing: border-box;
        }

        .btn-demo:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.22);
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

        .title-glow {
          animation: glowPulse 2.5s ease-in-out infinite;
        }

        .error-shake {
          animation: shake 0.4s ease;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatAnim {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }

        @keyframes glowPulse {
          0%   { text-shadow: 0 0 8px rgba(236,72,153,0.3); }
          50%  { text-shadow: 0 0 18px rgba(236,72,153,0.7), 0 0 28px rgba(139,92,246,0.5); }
          100% { text-shadow: 0 0 8px rgba(236,72,153,0.3); }
        }

        @keyframes bgZoom {
          from { background-size: 100%; }
          to   { background-size: 110%; }
        }

        @keyframes shake {
          0%   { transform: translateX(0); }
          25%  { transform: translateX(-5px); }
          50%  { transform: translateX(5px); }
          75%  { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* GLOW EFFECTS */}
      <div className="floating-bg" style={{ width: "260px", height: "260px", background: "#ec4899", top: "10%", left: "10%" }} />
      <div className="floating-bg" style={{ width: "220px", height: "220px", background: "#8b5cf6", bottom: "10%", right: "12%", animationDelay: "2s" }} />

      {/* LOGIN CARD */}
      <div
        className="glass-card"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
          borderRadius: "24px",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "420px",
          margin: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.2)",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          boxSizing: "border-box",
        }}
      >
        <h1 className="title-glow" style={{ color: "white", fontSize: "26px", fontWeight: "800", letterSpacing: "2px", marginBottom: "4px", marginTop: 0 }}>
          HEALTH & WELLNESS
        </h1>

        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "32px", fontSize: "14px", marginTop: 0 }}>
          Your personal wellness tracker
        </p>

        <h2 style={{ color: "white", fontSize: "20px", marginBottom: "24px", fontWeight: "600", marginTop: 0 }}>
          Welcome Back
        </h2>

        {/* EMAIL */}
        <div style={{ marginBottom: "16px", textAlign: "left", width: "100%" }}>
          <label style={labelStyle}>Email Address</label>
          <input
            className="input-field"
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: "24px", textAlign: "left", width: "100%" }}>
          <label style={labelStyle}>Password</label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              className="input-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                fontSize: "16px",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="error-shake"
            style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.5)", borderRadius: "10px", padding: "10px", marginBottom: "16px" }}
          >
            <p style={{ color: "#fca5a5", fontSize: "14px", margin: 0 }}>⚠️ {error}</p>
          </div>
        )}

        {/* LOGIN BUTTON */}
        <button onClick={handleLogin} disabled={loading} className="btn-primary">
          {loading ? "Logging in..." : "Login →"}
        </button>

        {/* DEMO BUTTON */}
        <button onClick={fillDemo} className="btn-demo">
          Use Demo Credentials
        </button>

        {/* REGISTER LINK */}
        <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "20px", marginBottom: 0, fontSize: "14px" }}>
          Don't have an account?{" "}
          <Link to="/register" className="link-hover" style={{ color: "#f9a8d4", fontWeight: "700", textDecoration: "none" }}>
            Register
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

export default Login;