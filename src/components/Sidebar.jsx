import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { path: "/home/dashboard",  label: "Dashboard",          icon: "⚡" },
  { path: "/home/fitness",    label: "Fitness Tracking",   icon: "🏋️" },
  { path: "/home/nutrition",  label: "Nutrition Planning", icon: "🥗" },
  { path: "/home/goals",      label: "Goal Setting",       icon: "🎯" },
  { path: "/home/profile",    label: "User Profile",       icon: "👤" }, ];


function Sidebar() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [hovered, setHovered] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .sidebar-root {
          font-family: 'DM Sans', sans-serif;
        }

        .sidebar-logo {
          font-family: 'Syne', sans-serif;
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 16px;
          border-radius: 14px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
          margin-bottom: 4px;
          letter-spacing: 0.01em;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: linear-gradient(120deg, rgba(236,72,153,0.18), rgba(139,92,246,0.12));
          opacity: 0;
          transition: opacity 0.22s;
        }

        .nav-link.active {
          color: white;
          background: linear-gradient(120deg, #ec4899 0%, #8b5cf6 100%);
          box-shadow: 0 4px 20px rgba(236,72,153,0.35);
          font-weight: 600;
        }

        .nav-link.hovered:not(.active)::before { opacity: 1; }
        .nav-link.hovered:not(.active) { color: rgba(255,255,255,0.88); }

        .nav-icon {
          font-size: 18px;
          min-width: 22px;
          text-align: center;
          transition: transform 0.2s;
        }

        .nav-link.active .nav-icon,
        .nav-link.hovered .nav-icon {
          transform: scale(1.15);
        }

        .active-pill {
          position: absolute;
          right: 14px;
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255,255,255,0.7);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 16px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 14px;
          color: #fca5a5;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .logout-btn:hover {
          background: rgba(239,68,68,0.22);
          border-color: rgba(239,68,68,0.4);
          color: #fecaca;
        }

        .avatar-ring {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 800;
          color: white;
          font-family: 'Syne', sans-serif;
          flex-shrink: 0;
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 16px 0;
        }
      `}</style>

      <div className="sidebar-root" style={{
        width: "260px",
        minWidth: "260px",
        background: "#0d1117",
        minHeight: "100vh",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}>

        {/* Logo */}
        <div style={{ padding: "0 8px", marginBottom: "32px" }}>
          <div className="sidebar-logo" style={{
            fontSize: "18px",
            fontWeight: "800",
            color: "white",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}>
            <span style={{ background: "linear-gradient(90deg,#ec4899,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Health
            </span>
            {" & "}
            <span style={{ color: "white" }}>Wellness</span>
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "3px", letterSpacing: "0.05em", fontWeight: "500" }}>
            YOUR FITNESS COMPANION
          </div>
        </div>

       

        {/* Nav Links */}
        <nav style={{ flex: 1 }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? "active" : ""} ${hovered === item.path && !isActive ? "hovered" : ""}`}
                onMouseEnter={() => setHovered(item.path)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
                {isActive && <span className="active-pill" />}
              </Link>
            );
          })}
        </nav>

        <div className="divider" />

        {/* User Card */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "14px",
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <div className="avatar-ring">
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.name || "User"}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.email || ""}
            </div>
          </div>
        </div>

        {/* Logout */}
        <button className="logout-btn" onClick={handleLogout}>
          <span>🚪</span>
          <span>Logout</span>
        </button>

      </div>
    </>
  );
}

export default Sidebar;
