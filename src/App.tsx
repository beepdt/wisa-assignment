import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import GenerateLink from "./pages/GenerateLink";
import PassportUpload from "./pages/PassportUpload";
import SelfEmployed from "./pages/SelfEmployed";
import ApplicationDone from "./pages/ApplicationDone";
import DestinationPage from "./pages/DestinationPage"; // Added DestinationPage import
import "./index.css";


function App() {
  
 
  return (
    <BrowserRouter>
      <Routes>
        {/* Agent routes (inside DashboardLayout) */}
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/generate-link"
          element={
            <DashboardLayout>
              <GenerateLink />
            </DashboardLayout>
          }
        />

        {/* Customer routes (standalone layout) */}
        <Route path="/destination" element={<DestinationPage />} />
        <Route path="/apply/:linkId/passport" element={<PassportUpload />} />
        <Route path="/apply/:linkId/self-employed" element={<SelfEmployed />} />
        <Route path="/apply/:linkId/done" element={<ApplicationDone />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
