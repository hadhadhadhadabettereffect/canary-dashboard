import { Container } from "flux/utils";
import * as React from "react";

import DeviceReadingsStore from "../stores/DeviceReadingsStore";
import FakeTable from "./FakeTable";


class DeviceReadings extends React.Component<{}, {data}> {
    public static getStores() {
        return [DeviceReadingsStore];
    }

    public static calculateState(prevState) {
        return {
            data: DeviceReadingsStore.getState()
        };
    }

    public render() {
        const data = this.state.data;
        if (data === null) return null;
        const tableDefs = [{
                name: "created at",
                text: data.dates,
                width: 230
            }, {
                name: "value",
                text: data.values.join("\n"),
                width: 70
            }];
        return (
            <div style={{width: "300px", height: "500px"}}>
                <FakeTable data={tableDefs} />
            </div>
        );
    }

}

export default Container.create(DeviceReadings);
