import React from 'react';
import ReactDOM from "react-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import Cesium from "cesium";
Cesium.Ion.defaultAccessToken = process.env.REACT_APP_CTOKEN
//require("dotenv").config()
//Cesium.CreditDisplay.cesiumCredit.showOnScreen=false
ReactDOM.render(<App />, document.getElementById("wrapper"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
