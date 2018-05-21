import { Container } from "flux/utils";
import * as React from "react";
import DeviceStore from "../../stores/DeviceStore";
import "./DeviceList.css";
import DeviceRow from "./DeviceRow";

class DeviceContainer extends React.Component {
    public static getStores() {
        return [DeviceStore];
    }

    public static calculateState(prevState) {
        return {
            devices: DeviceStore.getState()
        };
    }

    public render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Device name</th>
                        <th>type</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        );
    }

    private getRows() {
        return (this.state as any).devices.map((d, i) => {
            return <DeviceRow key={i} name={d.name} type={d.type} value={d.value} />;
        });
    }
}

export default Container.create(DeviceContainer as any);
