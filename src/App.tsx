import rawData from "./data/data.json";
import { DataTable } from "./componets/DataTable";

export default function App() {
  return (
    <div className="ls-page">
      <header className="ls-header">
        <div className="ls-brand">
          <h1>Marketing Dashboard</h1>

        </div>
      </header>

      <main className="ls-main">
        <div className="ls-debug" style={{ marginBottom: 12, textAlign: "left" }}>
          <strong>Debug:</strong> rows = {Array.isArray(rawData) ? rawData.length : 0}
          <pre style={{ maxHeight: 120, overflow: "auto", background: "#f8fafc", padding: 8 }}>
            {JSON.stringify(Array.isArray(rawData) && rawData.length ? rawData[0] : {}, null, 2)}
          </pre>
        </div>
        <DataTable data={rawData} />
      </main>

      <footer className="ls-footer">Developed by© 2025 Sujan Pal</footer>
    </div>
  );
}
