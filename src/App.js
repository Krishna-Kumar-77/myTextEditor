import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import TextEditor from "./components/TextEditor";
// import EditorImage from "./components/ImageEdit";
// import NewTextEditor from "./components/NewTextEditor";
 import KrEditor from "./components/KrEditor";
 import MyTextEditor from "./components/MyTextEditor";
//import CkEditor from "./components/CkEditor";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>React Text Editor</h1>
      </header>
      <div className="editor">
        {/* <TextEditor /> */}
        {/* <EditorImage /> */}
        {/* <NewTextEditor /> */}
        {/* <MyTextEditor/> */}
        <KrEditor/>
        {/* <CkEditor/> */}
      </div>
    </div>
  );
}

export default App;
