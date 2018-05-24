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
            <div>
                <Typography variant="headline">{props.name}</Typography>
                <Typography variant="caption">{props.type}</Typography>
            </div>
            <div style={{ position: "absolute", right: "60px", top: "60px" }}>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </Paper>
    );
}
