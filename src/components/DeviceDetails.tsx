import * as React from "react";

import DeviceOverview from "./DeviceOverview";
import ReadingsList from "./ReadingsList";
import ReadingsChart from "./ReadingsChart";
import ReadingsStats from "./ReadingsStats";

function DeviceDetails() {
    return (
        <div>
            <DeviceOverview />
            <ReadingsChart />
            <ReadingsStats />
            <ReadingsList />
        </div>
    );
}

export default DeviceDetails;
