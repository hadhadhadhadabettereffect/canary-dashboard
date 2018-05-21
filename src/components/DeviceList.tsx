import { Container } from "flux/utils";
import * as React from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { ClickAction } from "../constants/AppConstants";
import DeviceFocusStore from "../stores/DeviceFocusStore";
import DeviceListStore from "../stores/DeviceListStore";


class DeviceList extends React.Component {
    public static getStores() {
        return [DeviceListStore, DeviceFocusStore];
    }

    public static calculateState(prevState) {
        return {
            devices: DeviceListStore.getState(),
            focus: DeviceFocusStore.getState()
        };
    }

    public render() {
        const focus = (this.state as any).focus;
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Device</TableCell>
                            <TableCell>type</TableCell>
                            <TableCell>value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(this.state as any).devices.map((d) => {
                            return (
                                <TableRow
                                    key={d.id}
                                    data-action={ClickAction.deviceRow}
                                    data-device={d.id}
                                    selected={d.id === focus}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        data-action={ClickAction.deviceRow}
                                        data-device={d.id}
                                    >
                                        {d.name}
                                    </TableCell>
                                    <TableCell
                                        data-action={ClickAction.deviceRow}
                                        data-device={d.id}
                                    >
                                        {d.type}
                                    </TableCell>
                                    <TableCell
                                        numeric
                                        data-action={ClickAction.deviceRow}
                                        data-device={d.id}
                                    >
                                        {d.value}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default Container.create(DeviceList as any);
