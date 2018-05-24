import * as React from "react";
import { Container } from "flux/utils";

import DeviceDetailsStore,
    { DeviceDetailsState } from "../../stores/DeviceDetailsStore";
import { LayoutMeasurement } from "../../constants/options";
import { setChartType } from "../Chart";
import DeviceOverview from "./DeviceOverview";
import ReadingsList from "./ReadingsList";
import ReadingsChart from "./ReadingsChart";
import ReadingsStats from "./ReadingsStats";

class DeviceDetails extends React.Component<{}, DeviceDetailsState> {
    public static getStores() {
        return [DeviceDetailsStore];
    }

    public static calculateState(prevState) {
        const state = DeviceDetailsStore.getState();
        if (state.type.length) setChartType(state.type);
        return state;
    }

    public render() {
        if (!this.state.id.length) return null;

        return (
            <div style={{ width: LayoutMeasurement.deviceDetailsWidth }}>
                <DeviceOverview {...this.state} />
                <ReadingsChart />
                <ReadingsStats />
                <ReadingsList />
            </div>
        );
    }
}

export default Container.create(DeviceDetails);
