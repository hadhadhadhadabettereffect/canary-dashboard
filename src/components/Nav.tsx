import * as React from "react";

import {
    AppBar,
    Toolbar,
    Typography
} from "@material-ui/core";

import AddDeviceDialog from "./AddDeviceDialog";


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
                <AddDeviceDialog />
            </Toolbar>
        </AppBar>
    );
}

export default Nav;
