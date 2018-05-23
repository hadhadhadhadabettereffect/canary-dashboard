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

// const readingsFormFields = [
//     {
//         name: "value",
//         type: "number",
//         required: true,
//     }, {
//         name: "type",
//         type: "select",
//         required: true,
//         options: ["temperature", "humidity", "airquality"]
//     }, {
//         name: "createdAt",
//         type: "date",
//         required: false
//     }
// ];

interface ModalInputProps {
    type: string; // input type; e.g. text, select, checkbox
    name: string;
    required: boolean;
    value?: any;
    options?: string[];
}

interface ModalFormProps {
    title: string; // db col name
    fields: ModalInputProps[];
    values?: any; // initial values or uneditable params to be posted
    action(data: any): any; // calls fn with input values on submit
}


function ModalFormInput(props) {
    if (this.props.type === "select" && Array.isArray(this.props.options)) {
        return (
            <FormControl style={{ minWidth: 120 }} required={this.props.required}>
                <InputLabel htmlFor={this.props.name}>{this.props.name}</InputLabel>
                <Select
                    value={this.props.value}
                    inputProps={{
                        id: this.props.name,
                        name: this.props.name,
                    }}
                >
                {this.props.options.map((option) => {
                    return (<MenuItem key={option} value={option}> {option} </MenuItem>);
                })}
                </Select>
            </FormControl>
        );
    }
    return (
        <TextField
            required={this.props.required}
            margin="dense"
            id={this.props.name}
            label={this.props.name}
            name={this.props.name}
            type={this.props.type}
        />
    );
}

export default class ModalForm extends React.Component <ModalFormProps, {fields, values, open: boolean}> {

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    handleSubmit = () => {
        console.log("check required");
    }

    handleChange = (event) => {
        console.log(event.target);
    }

    render() {
        return (
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    <form onChange={this.handleChange} autoComplete="off">
                        {this.props.fields.map((f) => {
                            return React.createElement(ModalFormInput, f);
                        })}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

}
