import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Apollo unit testing using MockedProvider and enzyme</h1>
      <h2>
        See <code>UserProfile.test.js</code> file & <em>Tests</em> button below
      </h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
