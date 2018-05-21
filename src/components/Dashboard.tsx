import * as React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import DeviceList from "./DeviceList";

function Dashboard() {

    return (
        <Grid container spacing={24}>
            <Grid item xs={4}>
                <Paper>
                    <DeviceList />
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Paper>details</Paper>
            </Grid>

        </Grid>
    );
}

export default Dashboard;
