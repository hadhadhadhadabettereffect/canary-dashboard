import * as React from "react";

import { Button } from "@material-ui/core";

import { FormInputProps } from "./FormInput";
import ModalForm from "./ModalForm";

export interface PopupFormProps {
    fields: FormInputProps[];
    buttonContent: string | any;
    handleSubmit(data: any): void;
}

export default class PopupForm extends React.Component<PopupFormProps, { open: boolean }> {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    handleSubmit = (data) => {
        this.props.handleSubmit(data);
        this.handleClose();
    }

    render() {
        return (
            <div>
                <Button
                    onClick={this.handleClickOpen}
                    color="inherit"
                    mini
                >
                    {this.props.buttonContent}
                </Button>
                <ModalForm
                    open={this.state.open}
                    fields={this.props.fields}
                    title="add device"
                    handleSubmit={this.handleSubmit}
                    handleClose={this.handleClose}
                />
            </div>
        );
    }
}
