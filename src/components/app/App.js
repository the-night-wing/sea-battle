import React from 'react';
import Field from "../field"
import withCells from "../field/withCells"
import './App.css';
import "./reset.css";

function App() {

  const FieldWithCells = withCells(Field, 50)

  return (
    <div className="App">
      <FieldWithCells/>
      {/* <Field/> */}
    </div>
  );
}

export default App;
