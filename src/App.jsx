import React from "react";
import ReactDOM from "react-dom";
import Chat from "./components/Chat/Chat";

import "./index.css";

const App = () => {
  return (
    <Chat />
  )
}

ReactDOM.render(<App />, document.getElementById("app"));
