import * as React from "react";

import FlashMsg from "../FlashMsg";
import DeviceList from "../DeviceList";
import DeviceDetails from "../DeviceDetails";
import Nav from "./Nav";
import "./Dashboard.css";


/**
 * wrapping container
 */
export default function Dashboard() {
    return (
        <div>
            <Nav />
            <div id="dashboard">
                <div className="dashboard__inner">
                    <div className="col-1">
                        <DeviceList />
                    </div>
                    <div className="col-2">
                        <DeviceDetails />
                    </div>
                </div>
            </div>
            <FlashMsg />
        </div>
    );
}
