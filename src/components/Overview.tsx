import { Container } from "flux/utils";
import * as React from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import StatsStore from "../stores/StatsStore";


class DeviceList extends React.Component {
    public static getStores() {
        return [StatsStore];
    }

    public static calculateState(prevState) {
        return {
            stats: StatsStore.getState(),
        };
    }

    public render() {
        const stats = (this.state as any).stats;
        if (stats === null) return null;
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>type</TableCell>
                            <TableCell>devices</TableCell>
                            <TableCell>low</TableCell>
                            <TableCell>average</TableCell>
                            <TableCell>high</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>temperature</TableCell>
                            <TableCell>{stats.temperature.devices.length}</TableCell>
                            <TableCell>{stats.temperature.min}</TableCell>
                            <TableCell>{stats.temperature.mean}</TableCell>
                            <TableCell>{stats.temperature.max}</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>humidity</TableCell>
                            <TableCell>{stats.humidity.devices.length}</TableCell>
                            <TableCell>{stats.humidity.min}</TableCell>
                            <TableCell>{stats.humidity.mean}</TableCell>
                            <TableCell>{stats.humidity.max}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>temperature</TableCell>
                            <TableCell>{stats.airquality.devices.length}</TableCell>
                            <TableCell>{stats.airquality.min}</TableCell>
                            <TableCell>{stats.airquality.mean}</TableCell>
                            <TableCell>{stats.airquality.max}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default Container.create(DeviceList as any);
