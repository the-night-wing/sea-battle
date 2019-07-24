import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend"

import './App.css';
import "./reset.css";
// import "../../helpers/bootstrap.css"

import Game from "../game"

function App() {

  return (
    <DndProvider
        backend={HTML5Backend}
    >
      <div className="App">
        <Game/>
      </div>
    </DndProvider>
  );
}

export default App;
