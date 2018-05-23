import * as React from "react";

import {
    AppBar,
    Toolbar,
    Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import PopupForm from "./PopupForm";
import { postNewDevice } from "../requests";
import { deviceFormFields } from "../constants/formfields";

/**
 * wrapping container
 */
function Nav() {
    const deviceBtn = [(<AddIcon/>), "add device"];
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    Canary
                </Typography>
                <PopupForm
                    fields={deviceFormFields}
                    handleSubmit={postNewDevice}
                    buttonContent={deviceBtn}
                />
            </Toolbar>
        </AppBar>
    );
}

export default Nav;
