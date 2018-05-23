import { Container } from "flux/utils";
import * as React from "react";

import Paper from "@material-ui/core/Paper";

import DeviceDetailsStore from "../stores/DeviceDetailsStore";
import DeviceListStore from "../stores/DeviceListStore";
import DeviceListGroup from "./DeviceListGroup";


class DeviceList extends React.Component<{}, { devices: any; focus: string|null; }> {
    public static getStores() {
        return [DeviceListStore, DeviceDetailsStore];
    }

    public static calculateState(prevState) {
        return {
            devices: DeviceListStore.getState(),
            focus: DeviceDetailsStore.getState().id
        };
    }

    public render() {
        if (this.state.devices === null) return null;
        return (
            <Paper>
                <DeviceListGroup
                    focus={this.state.focus}
                    type="temperature"
                    data={this.state.devices.temperature}
                />
                <DeviceListGroup
                    focus={this.state.focus}
                    type="humidity"
                    data={this.state.devices.humidity}
                />
                <DeviceListGroup
                    focus={this.state.focus}
                    type="air quality"
                    data={this.state.devices.airquality}
                />
            </Paper>
        );
    }
}

export default Container.create(DeviceList);
