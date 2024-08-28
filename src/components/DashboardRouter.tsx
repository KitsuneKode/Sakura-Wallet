//@ts-nocheck

import { Routes, Route } from "react-router-dom";
import SendCrypto from "./SendCrypto";
function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/send" element={<SendCrypto />} />
    </Routes>
  );
}

export default DashboardRoutes;
