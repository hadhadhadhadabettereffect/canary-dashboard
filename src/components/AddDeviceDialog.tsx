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
import AddIcon from "@material-ui/icons/Add";

import { postNewDevice } from "../requests";


interface FormDialogState {
    deviceName: string;
    deviceType: string;
    open: boolean;
    inputErr: boolean;
}

export default class FormDialog extends React.Component <{}, FormDialogState> {
    public state = {
        deviceName: "",
        deviceType: "temperature",
        open: false,
        inputErr: false
    };

    public handleClickOpen = () => {
        this.setState({ open: true });
    }

    public handleClose = () => {
        this.setState({
            deviceName: "",
            deviceType: "temperature",
            open: false,
            inputErr: false
        });
    }

    public handleSend = () => {
        if (this.state.deviceName.length === 0) {
            this.setState({
                inputErr: true
            });
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
                <Button
                    onClick={this.handleClickOpen}
                    color="inherit"
                    mini
                >
                    <AddIcon />
                    add device
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Add Device</DialogTitle>
                    <DialogContent>
                        <form autoComplete="off">
                            <TextField
                                autoFocus
                                required
                                error={this.state.inputErr}
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
