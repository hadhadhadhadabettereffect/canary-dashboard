import { Container } from "flux/utils";
import * as React from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import DeviceListStore from "../stores/DeviceListStore";


class DeviceList extends React.Component {
    public static getStores() {
        return [DeviceListStore];
    }

    public static calculateState(prevState) {
        return {
            devices: DeviceListStore.getState()
        };
    }

    public render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Device</TableCell>
                            <TableCell>type</TableCell>
                            <TableCell numeric={true}>value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(this.state as any).devices.map((d) => {
                            return (
                                <TableRow key={d.id}>
                                    <TableCell component="th" scope="row">
                                        {d.name}
                                    </TableCell>
                                    <TableCell>{d.type}</TableCell>
                                    <TableCell numeric={true}>{d.value}</TableCell>
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
