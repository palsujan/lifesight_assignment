import rawData from "./data/data.json";
import { DataTable } from "./componets/DataTable";

export default function App() {
  return (
    <div className="ls-page">
      <header className="ls-header">
        <div className="ls-brand">
          <h1>marketing Dashboard</h1>

        </div>
      </header>

      <main className="ls-main">
        <DataTable data={rawData} />
      </main>

      <footer className="ls-footer">Developed by© 2025 Sujan Pal</footer>
    </div>
  );
}
