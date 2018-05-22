import * as React from "react";

import DeviceList from "./DeviceList";
import DeviceReadings from "./DeviceReadings";
import FlashMsg from "./FlashMsg";
import Nav from "./Nav";
import ReadingsStats from "./ReadingsStats";


import "./Dashboard.css";

/**
 * wrapping container
 */
function Dashboard() {
    return (
        <div>
            <Nav />
            <div id="dashboard">
                <div className="dashboard__inner">
                    <div className="col-1">
                        <DeviceList />
                    </div>
                    <div className="col-2">
                        <ReadingsStats />
                        <DeviceReadings />
                    </div>
                </div>
            </div>
            <FlashMsg />
        </div>
    );
}

export default Dashboard;
