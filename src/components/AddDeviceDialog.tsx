import * as React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";

import { postNewDevice } from "../requests";


interface FormDialogState {
    deviceName: string;
    deviceType: string;
    open: boolean;
}

export default class FormDialog extends React.Component <{}, FormDialogState> {
    public state = {
        deviceName: "",
        deviceType: "temperature",
        open: false
    };

    public handleClickOpen = () => {
        this.setState({ open: true });
    }

    public handleClose = () => {
        this.setState({
            deviceName: "",
            deviceType: "temperature",
            open: false
        });
    }

    public handleSend = () => {
        if (this.state.deviceType.length === 0 ||
            this.state.deviceName.length === 0) {
                console.warn("name and type fields are required");
        } else {
            const str = JSON.stringify({
                name: this.state.deviceName,
                type: this.state.deviceType
            });
            postNewDevice(str);
            this.handleClose();
        }
    }

    public handleChange = (event) => {
        const t = event.target;
        const s = {};
        s[t.name] = t.value;
        this.setState(s);
    }

    public render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen} color="inherit">+ Device</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Add Device</DialogTitle>
                    <DialogContent>
                        <form autoComplete="off">
                            <TextField
                                autoFocus
                                margin="dense"
                                id="device-name"
                                label="Device name"
                                name="deviceName"
                                type="text"
                                onChange={this.handleChange}
                            />
                            <FormControl style={{ minWidth: 120 }}>
                                <InputLabel htmlFor="device-type">Type</InputLabel>
                                <Select
                                    value={this.state.deviceType}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        id: "device-type",
                                        name: "deviceType",
                                    }}
                                >
                                    <MenuItem value="temperature">temperature</MenuItem>
                                    <MenuItem value="airquality">air quality</MenuItem>
                                    <MenuItem value="humidity">humidity</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSend} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
