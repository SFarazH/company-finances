import Dashboard from "./Dashboard";
import CompanyForm from "./components/CompanyForm";
import KPI from "./components/KPI";
import SideMenu from "./components/SideMenu";
import Companies from "./pages/Companies";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Expenses from "./pages/Expenses";
import Projects from "./pages/Projects";
import Purchases from "./pages/Purchases";
import Payments from "./pages/Payments";

function App() {
  return (
    <Router>
      <div className="flex">
        <div className="w-2/12">
          <SideMenu />
        </div>

        <div className="w-10/12">
          <KPI />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Companies />} />
            <Route path="/projects/*" element={<Projects />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
