export default function Dashboard() {
  return (
    <div style={{ maxWidth: 1100, margin: "30px auto", padding: "0 16px" }}>
      <h2 style={{ marginBottom: 16 }}>Your Health Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <Card title="BMI" value="22.5 (Normal)" />
        <Card title="Glucose" value="92 mg/dL" />
        <Card title="Blood Pressure" value="118/76 mmHg" />
      </div>

      <div style={{ marginTop: 24 }}>
        <h3>Personal Details</h3>
        <ul>
          <li><b>Name:</b> Demo User</li>
          <li><b>Gender:</b> Female</li>
          <li><b>Phone:</b> +91-99999-00000</li>
        </ul>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{ border:"1px solid #eee", borderRadius: 12, padding: 16, background:"#fff" }}>
      <div style={{ fontSize: 14, color:"#64748b" }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{value}</div>
    </div>
  );
}
