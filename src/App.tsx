import React from "react";
import Header from "./components/headers/WorkSpaceHeader";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { BoardProvider } from "./context/BoardContext";

const App: React.FC = () => {
  return (
    <BoardProvider>
      <Header />
      <div className=" flex">
        <Sidebar />
        <Main />
      </div>
    </BoardProvider>
  );
};

export default App;
