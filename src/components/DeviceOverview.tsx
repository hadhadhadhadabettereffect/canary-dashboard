import { Container } from "flux/utils";
import * as React from "react";
import {
    IconButton,
    Paper,
    Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import DeviceDetailsStore,
    { DeviceDetailsState } from "../stores/DeviceDetailsStore";
import { deleteDevice } from "../requests";
import { setChartType } from "./Chart";

class DeviceOverview extends React.Component<{}, DeviceDetailsState> {
    public static getStores() {
        return [DeviceDetailsStore];
    }

    public static calculateState(prevState) {
        const state = DeviceDetailsStore.getState();
        if (state.type.length) setChartType(state.type);
        return state;
    }

    public render() {
        if (!this.state.id.length) return null;
        return (
            <Paper style={{ padding: "32px 16px" }}>
                <div>
                    <Typography variant="headline">{this.state.name}</Typography>
                    <Typography variant="caption">{this.state.type}</Typography>
                </div>
                <div style={{ position: "absolute", right: "60px", top: "60px" }}>
                    <IconButton onClick={this.handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Paper>
        );
    }

    private handleDelete = () => {
        deleteDevice(this.state.id);
    }
}

export default Container.create(DeviceOverview);
