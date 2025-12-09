import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    padding: "8px 12px",
    textDecoration: "none",
    borderRadius: 8,
    fontWeight: 600,
    background: isActive ? "#e8f1ff" : "transparent"
  });

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 20px",
      borderBottom: "1px solid #eee",
      position: "sticky",
      top: 0,
      background: "#fff",
      zIndex: 10
    }}>
      <Link to="/" style={{ textDecoration: "none", fontSize: 20, fontWeight: 700 }}>
        HeyDoc<span style={{ color: "#3b82f6" }}>+</span>
      </Link>

      <div style={{ display: "flex", gap: 10 }}>
        <NavLink to="/" style={linkStyle} end>Home</NavLink>
        <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/doctors" style={linkStyle}>Doctors</NavLink>
        <NavLink to="/predictor" style={linkStyle}>Predictor</NavLink>
        <NavLink to="/appointments" style={linkStyle}>Appointments</NavLink> {/* ✅ NEW */}
      </div>
    </nav>
  );
}




















// import { Link, NavLink } from "react-router-dom";

// export default function Navbar() {
//   // function to style the active link
//   const linkStyle = ({ isActive }) => ({
//     padding: "8px 12px",
//     textDecoration: "none",
//     borderRadius: 8,
//     fontWeight: 600,
//     background: isActive ? "#e8f1ff" : "transparent"
//   });

//   return (
//     <nav style={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "14px 20px",
//       borderBottom: "1px solid #eee",
//       position: "sticky",
//       top: 0,
//       background: "#fff",
//       zIndex: 10
//     }}>
//       {/* Logo */}
//       <Link to="/" style={{ textDecoration: "none", fontSize: 20, fontWeight: 800 }}>
//         HeyDoc<span style={{color:"#3b82f6"}}>+</span>
//       </Link>

//       {/* Navigation Links */}
//       <div style={{ display: "flex", gap: 10 }}>
//         <NavLink to="/" style={linkStyle} end>Home</NavLink>
//         <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
//         <NavLink to="/doctors" style={linkStyle}>Doctors</NavLink>
//         <NavLink to="/predictor" style={linkStyle}>Predictor</NavLink>
//       </div>
//     </nav>
//   );
// }
