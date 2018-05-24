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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { ClickTarget } from "../../constants/AppConstants";
import ValueRange from "../ValueRange";


interface DeviceGroupData {
    min: number;
    max: number;
    ave: number;
    devices: any[];
}

interface DeviceGroupProps {
    focus: string|null;
    type: string;
    data: DeviceGroupData;
}


/**
 * list of devices of a particular type (temperature, humidity, airquality)
 */
export default function DeviceListGroup(props: DeviceGroupProps) {
    return (
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <ValueRange
                    min={props.data.min}
                    max={props.data.max}
                    ave={props.data.ave}
                    count={props.data.devices.length}
                    label={props.type}
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
                        props.data.devices.map((d, i) => {
                            return (
                                <TableRow
                                    key={d.id}
                                    hover
                                    data-target={ClickTarget.deviceRow}
                                    data-id={d.id}
                                    data-name={d.name}
                                    data-type={props.type}
                                    selected={d.id === props.focus}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        data-target={ClickTarget.deviceRow}
                                        data-id={d.id}
                                        data-name={d.name}
                                        data-type={props.type}
                                    >
                                        {d.name}
                                    </TableCell>
                                    <TableCell
                                        numeric
                                        data-target={ClickTarget.deviceRow}
                                        data-id={d.id}
                                        data-name={d.name}
                                        data-type={props.type}
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
