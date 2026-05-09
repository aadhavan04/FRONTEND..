import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged Out Successfully!");
    setTimeout(() => navigate("/login"), 1000);
  };

  if (!user) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <div style={{ textAlign: "center", color: "#6b7280" }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>⏳</div>
        <p>Loading profile...</p>
      </div>
    </div>
  );

  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const stats = [
    { label: "Member Since", value: "2025", icon: "📅" },
    { label: "Goals Set",    value: JSON.parse(localStorage.getItem(`goals_${user.id}`) || "[]").length, icon: "🎯" },
    { label: "Workouts",     value: JSON.parse(localStorage.getItem(`fitnessWorkouts_${user.id}`) || "[]").length, icon: "🏋️" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .profile-root { font-family: 'DM Sans', sans-serif; }

        .info-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .info-row:last-child { border-bottom: none; }

        .info-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: #fdf4ff;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }

        .stat-card {
          background: white;
          border: 1px solid #f3f4f6;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          flex: 1;
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .stat-card:hover {
          box-shadow: 0 4px 20px rgba(236,72,153,0.1);
          transform: translateY(-2px);
        }

        .logout-btn-profile {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(239,68,68,0.3);
        }

        .logout-btn-profile:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(239,68,68,0.4);
        }
      `}</style>

      <div className="profile-root" style={{ maxWidth: "680px", margin: "auto", padding: "24px" }}>
        <ToastContainer />

        {/* Hero Header */}
        <div style={{
          background: "linear-gradient(135deg, #0d1117 0%, #1a1f2e 100%)",
          borderRadius: "24px",
          padding: "40px 32px",
          marginBottom: "24px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative glow */}
          <div style={{
            position: "absolute", top: "-40px", right: "-40px",
            width: "200px", height: "200px",
            background: "radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />
          <div style={{
            position: "absolute", bottom: "-60px", left: "30%",
            width: "160px", height: "160px",
            background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />

          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Avatar */}
            <div style={{
              width: "72px", height: "72px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "26px", fontWeight: "800", color: "white",
              fontFamily: "'Syne', sans-serif",
              flexShrink: 0,
              boxShadow: "0 8px 24px rgba(236,72,153,0.4)",
            }}>
              {initials}
            </div>

            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: "800", color: "white", lineHeight: 1.2 }}>
                {user.name}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginTop: "4px" }}>
               Member Of Health & Wellness
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                marginTop: "10px", padding: "4px 12px",
                background: "rgba(236,72,153,0.2)", borderRadius: "20px",
                border: "1px solid rgba(236,72,153,0.3)",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ec4899", display: "inline-block" }} />
                <span style={{ fontSize: "11px", color: "#f9a8d4", fontWeight: "600" }}>ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "flex", gap: "14px", marginBottom: "24px" }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>{s.icon}</div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "#111827", fontFamily: "'Syne', sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* User Information Card */}
        <div style={{ background: "white", borderRadius: "20px", padding: "24px", marginBottom: "24px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: "700", color: "#111827", marginBottom: "4px", marginTop: 0 }}>
            User Information
          </h2>
          <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "16px", marginTop: 0 }}>Your account details</p>

          {[
            { icon: "👤", label: "Full Name",  value: user.name },
            { icon: "📧", label: "Email",      value: user.email },
            { icon: "🔑", label: "User ID",    value: user.id },
          ].map((row, i) => (
            <div key={i} className="info-row">
              <div className="info-icon">{row.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase" }}>{row.label}</div>
                <div style={{ fontSize: "15px", color: "#111827", fontWeight: "500", marginTop: "2px" }}>{row.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div style={{ textAlign: "center" }}>
          <button className="logout-btn-profile" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;