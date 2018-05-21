import * as React from "react";

import Grid from "@material-ui/core/Grid";

import DeviceList from "./DeviceList";
import Overview from "./Overview";

function Dashboard() {
    return (
        <Grid container spacing={24}>
            <Grid item>
                <DeviceList />
            </Grid>
            <Grid item>
                <Overview />
            </Grid>
        </Grid>
    );
}

export default Dashboard;
