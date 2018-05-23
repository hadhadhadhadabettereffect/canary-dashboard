import { Container } from "flux/utils";
import * as React from "react";
import { deleteDevice } from "../requests";


import {
    IconButton,
    Paper,
    Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import DeviceDetailsStore,
    { DeviceDetailsState } from "../stores/DeviceDetailsStore";


class DeviceOverview extends React.Component<{}, DeviceDetailsState> {
    public static getStores() {
        return [DeviceDetailsStore];
    }

    public static calculateState(prevState) {
        return DeviceDetailsStore.getState();
    }

    public render() {
        if (!this.state.id.length) return null;
        return (
            <Paper style={{ padding: "32px 16px" }}>
                <div>
                    <IconButton aria-label="Delete device" onClick={this.handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </div>
                <div>
                    <Typography variant="headline">{this.state.name}</Typography>
                    <Typography variant="caption">{this.state.type}</Typography>
                </div>
            </Paper>
        );
    }

    private handleDelete = () => {
        deleteDevice(this.state.id);
    }
}

export default Container.create(DeviceOverview);
