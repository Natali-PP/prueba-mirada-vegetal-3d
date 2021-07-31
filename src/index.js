import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import CustomBlender from './CustomBlender.js'
//import App2 from "./App2.js";


const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    {/*<h1>Mirada</h1>
    <h1>Vegetal</h1>
    <App2  />*/}
    <Suspense fallback={null}>
      <CustomBlender />
    </Suspense>
  </React.StrictMode>,
  rootElement
);
