import { Container } from "flux/utils";
import * as React from "react";

import {
    IconButton,
    Snackbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import FlashMsgStore from "../stores/FlashMsgStore";


class FlashMsg extends React.Component<{}, { msg: string; open: boolean; success: boolean; }> {
    public static getStores() {
        return [FlashMsgStore];
    }

    public static calculateState(prevState) {
        const msg = FlashMsgStore.getState();
        return {
            msg: msg.text,
            open: msg.text.length > 0,
            success: msg.success
        };
    }

    public handleClose = () => {
        this.setState({open: false, msg: ""});
    }

    public render() {
        return (
            <Snackbar
                anchorOrigin={{
                    horizontal: "left",
                    vertical: "bottom",
                }}
                open={this.state.open}
                color={this.state.success ? "primary" : "error"}
                autoHideDuration={500}
                message={<span id="message-id">{this.state.msg}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        );
    }
}

export default Container.create(FlashMsg);
