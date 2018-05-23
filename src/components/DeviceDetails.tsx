import * as React from "react";

import DeviceOverview from "./DeviceOverview";
import ReadingsList from "./ReadingsList";
import ReadingsChart from "./ReadingsChart";
import ReadingsStats from "./ReadingsStats";

function DeviceDetails() {
    return (
        <div>
            <ReadingsChart />
            <ReadingsStats />
            <DeviceOverview />
            <ReadingsList />
        </div>
    );
}

export default DeviceDetails;
