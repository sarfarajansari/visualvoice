import React, { useEffect, useState } from "react";
import Sidebar, { SidebarProvider } from "./components/sidebar/Sidebar";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/sidebar/header";
import Dashboard from "./components/dashboard/dashboard";
import CaptionStream from "./components/captionStream/topicView/topicView";
import Learn from "./components/captionStream/learn/learn";
import { CaptionContext } from "./components/captionStream/learn/caption";

function App() {
  const [activeMenu, setActiveMenu] = React.useState("");
  const [activeSubject, setActiveSubject] = React.useState(null);
  const [header, setHeader] = React.useState("Visual Voice");
  const [currentCaption, setCurrentCaption] = React.useState("");
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const activeSubject = localStorage.getItem("activeSubject");
    if (activeSubject) {
      setActiveSubject(JSON.parse(activeSubject));
    }
  }, []);

  useEffect(() => {
    if (!activeSubject) return;
    localStorage.setItem("activeSubject", JSON.stringify(activeSubject));
  }, [activeSubject]);

  return (
    <HashRouter>
      <SidebarProvider
        value={{
          active: activeMenu,
          setActive: setActiveMenu,
          activeSubject: activeSubject,
          setActiveSubject: setActiveSubject,
          header: header,
          setHeader: setHeader,
        }}
      >
        <CaptionContext.Provider
          value={{
            currentCaption,
            setCurrentCaption,
            currentTime,
            setCurrentTime,
          }}
        >
          <div className="App">
            <Header />
            <Routes>
              <Route path="/Caption Stream" Component={CaptionStream} />

              <Route path="/Caption Stream/:videoId" Component={Learn} />

              <Route path="/" Component={Dashboard} />
            </Routes>
          </div>
        </CaptionContext.Provider>
      </SidebarProvider>
    </HashRouter>
  );
}

export default App;
