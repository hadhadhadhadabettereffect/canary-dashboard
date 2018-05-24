import * as React from "react";

import {
    AppBar,
    Toolbar,
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
        <AppBar position="static" style={{ background: "white", color: "black" }}>
            <Toolbar>
                <div style={{ width: 100 }}>
                   <img src="/logo.png" />
                </div>
                <PopupForm
                    fields={deviceFormFields}
                    handleSubmit={postNewDevice}
                    label="add device"
                    buttonContent={<AddIcon/>}
                />
            </Toolbar>
        </AppBar>
    );
}

export default Nav;
