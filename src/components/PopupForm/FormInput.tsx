import * as React from "react";

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";


export interface FormInputProps {
    type: string; // input type; e.g. text, select, checkbox
    name: string;
    required?: boolean;
    value?: any;
    options?: string[];
}

export default class FormInput extends React.Component<FormInputProps, {}> {
    state = {
        value: ""
    };

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    render() {
        if (this.props.type === "select" && Array.isArray(this.props.options)) {
            return (
                <FormControl style={{ minWidth: 120 }} required={this.props.required}>
                    <InputLabel htmlFor={this.props.name}>{this.props.name}</InputLabel>
                    <Select
                        onChange={this.handleChange}
                        value={this.state.value}
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
}
