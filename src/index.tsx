import * as React from "react";
import * as ReactDOM from "react-dom";

import Dashboard from "./components/Dashboard";
import "./listeners";
import { getDeviceList } from "./requests";

ReactDOM.render(
    <Dashboard />,
    document.getElementById("root") as HTMLElement
);

// fetch device list on load
getDeviceList();
