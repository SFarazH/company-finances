import Dashboard from "./Dashboard";
import CompanyForm from "./components/CompanyForm";
import KPI from "./components/KPI";
import SideMenu from "./components/SideMenu";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="grid grid-cols-[auto_1fr]">
        <SideMenu />
        <Dashboard />
      </div>
    </>
  );
}

export default App;
