import * as React from "react";
import {
    IconButton,
    Paper,
    Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteDevice } from "../../requests";

let deviceId = "";

function handleDelete() {
    deleteDevice(deviceId);
}

export default function DeviceOverview(props) {
    deviceId = props.id;
    return (
        <Paper style={{ padding: "32px 16px" }}>
            <div style={{ display: "inline-block", width: "300px" }}>
                <Typography variant="headline">{props.name}</Typography>
            </div>
            <div style={{ display: "inline-block" }}>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <Typography variant="caption">{props.type}</Typography>
        </Paper>
    );
}
