import { Container } from "flux/utils";
import * as React from "react";

// import Paper from "@material-ui/core/Paper";

import ReadingsStatsStore from "../stores/ReadingsStatsStore";
import ValueRange from "./ValueRange";

class ReadingsStats extends React.Component <{}, {stats}> {
    public static getStores() {
        return [ReadingsStatsStore];
    }

    public static calculateState(prevState) {
        return {
            stats: ReadingsStatsStore.getState()
        };
    }

    public render() {
        const stats = this.state.stats;
        if (stats === null) return null;
        return (
            <ValueRange
                min={stats.min}
                max={stats.max}
                ave={stats.ave}
                count={stats.count}
            />
        );
    }
}

export default Container.create(ReadingsStats);
