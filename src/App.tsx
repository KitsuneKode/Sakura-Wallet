import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingAnimation from "./components/LoadingAnimation";
import LandingPage from "./components/Landing";
import Component from "./components/Dashboard";
import NotFound from "./components/404";
import SetupWallet from "./components/SetupWallet";

import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loadingDuration = 4000; // 4 seconds

  useEffect(() => {
    // Any initial setup that needs to happen can go here
  }, []);

  if (isLoading) {
    return (
      <LoadingAnimation
        duration={loadingDuration}
        onLoadingComplete={() => {
          if (document.readyState === "complete") {
            //   setIsLoading(true);
            setIsLoading(false);
          } else {
            window.location.reload();
          }
        }}
      />
    );
  }

  return (
    <>
      <Router>
        {/* <AlertStack /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/setupWallet/" element={<SetupWallet />}></Route>
          <Route path="/dashboard/" element={<Component />} />
          {/* <Route path="/admin/feature/" element={<NewComponent />} /> */}

          {/* <Route path="/send" element={<ReceiveCrypto />} /> */}
          {/* <Route path="/dashboard/send" element={<SendCrypto Props={props} />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
