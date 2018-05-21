import * as React from "react";
import * as ReactDOM from "react-dom";
import DeviceActionCreators from "./actions/DeviceActionCreators";
import DeviceList from "./components/DeviceList";
import "./styles.css";

ReactDOM.render(
    <DeviceList />,
    document.getElementById("root") as HTMLElement
);

// fetch device list on load
DeviceActionCreators.getList();
