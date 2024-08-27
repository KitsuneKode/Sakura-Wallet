import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import SendCrypto from "./SendCrypto";
function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/send" element={<SendCrypto />} />
    </Routes>
  );
}

export default DashboardRoutes;
