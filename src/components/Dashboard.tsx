import * as React from "react";

import DeviceList from "./DeviceList";
import DeviceReadings from "./DeviceReadings";
import ReadingsStats from "./ReadingsStats";

import "./Dashboard.css";

/**
 * wrapping container
 */
function Dashboard() {
    return (
        <div id="dashboard">
            <div className="col-1">
                <DeviceList />
            </div>
            <div className="col-2">
                <ReadingsStats />
                <DeviceReadings />
            </div>
        </div>
    );
}

export default Dashboard;
