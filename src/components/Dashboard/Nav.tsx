import * as React from "react";

import {
    AppBar,
    Toolbar,
    Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import PopupForm from "../PopupForm";
import { postNewDevice } from "../../requests";
import { deviceFormFields } from "../../constants/formfields";

/**
 * wrapping container
 */
function Nav() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    Canary
                </Typography>
                <PopupForm
                    fields={deviceFormFields}
                    handleSubmit={postNewDevice}
                    buttonContent={[(<AddIcon key="btn" />), "add device"]}
                />
            </Toolbar>
        </AppBar>
    );
}

export default Nav;
