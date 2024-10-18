import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SensorPage from "./pages/SensorPage";
import Sidebar from "./components/common/Sidebar";

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/sensor" element={<SensorPage />} />
      </Routes>
    </div>
  );
}

export default App;
