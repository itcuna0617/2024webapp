import React from "react";
import NavbarComp from "./layout/NavbarComp";
// import NavPractice from "./layout/NavPractice";
import VisualComp from "./components/home/VisualComp";
import SectionComp from "./components/home/SectionComp";

function App() {
  return (
    <>
      <NavbarComp />
      {/* 이건 연습으로 똑같이 만들어본 것 */}
      {/* <NavPractice /> */}
      <VisualComp />
      <SectionComp />
    </>
  );
}

export default App;
