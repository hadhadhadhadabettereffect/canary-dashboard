import * as React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";

import FormInput, { FormInputProps } from "./FormInput";


export interface ModalFormProps {
    open: boolean;
    title: string; // db col name
    fields: FormInputProps[];
    handleSubmit(data: any): void; // calls fn with input values on submit
    handleClose(): void;
}

export default class ModalForm extends React.Component <ModalFormProps, {}> {

    handleClose = () => {
        this.setState({});
        this.props.handleClose();
    }

    handleSubmit = () => {
        const state = Object.assign({}, this.state);
        const errs = {};
        for (const field of this.props.fields) {
            if (field.required && !state.hasOwnProperty(field.name)) {
                errs[field.name] = true;
            }
        }
        this.props.handleSubmit(state);
        this.handleClose();
    }

    handleChange = (event) => {
        const t = event.target;
        this.setState({
            [t.name]: t.value
        });
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.handleClose}>
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    <form onChange={this.handleChange} autoComplete="off">
                        {this.props.fields.map((f) => {
                            return React.createElement(FormInput,
                                Object.assign({key: f.name}, f));
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
