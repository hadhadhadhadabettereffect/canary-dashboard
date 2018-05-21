import * as React from "react";
import * as ReactDOM from "react-dom";
import DeviceActionCreators from "./actions/DeviceActionCreators";
import Dashboard from "./components/Dashboard";
import "./listeners";

ReactDOM.render(
    <Dashboard />,
    document.getElementById("root") as HTMLElement
);

// fetch device list on load
DeviceActionCreators.getList();
