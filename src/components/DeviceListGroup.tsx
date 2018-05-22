import * as React from "react";

import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { ClickAction } from "../constants/AppConstants";
import ValueRange from "./ValueRange";

// interface DeviceGroupData {
//     min: number;
//     max: number;
//     ave: number;
//     devices: any[];
// }

interface DeviceGroupProps {
    focus: string|null;
    type: string;
    data: any;
}

/**
 * list of devices of a particular type (temperature, humidity, airquality)
 */
function DeviceListGroup(props: DeviceGroupProps) {
    return (
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ width: "160px" }}>{props.type}</Typography>
                <ValueRange
                    min={props.data.min}
                    max={props.data.max}
                    ave={props.data.ave}
                    count={props.data.devices.length}
                />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>device</TableCell>
                            <TableCell>reading</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ cursor: "pointer" }}>
                    {
                        props.data.devices.map((d) => {
                            return (
                                <TableRow
                                    key={d.id}
                                    data-action={ClickAction.deviceRow}
                                    data-device={d.id}
                                    hover
                                    selected={d.id === props.focus}
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
                                        numeric
                                        data-action={ClickAction.deviceRow}
                                        data-device={d.id}
                                    >
                                        {d.value}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                    </TableBody>
                </Table>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default DeviceListGroup;
