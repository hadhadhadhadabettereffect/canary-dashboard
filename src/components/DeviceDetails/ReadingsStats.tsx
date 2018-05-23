import { Container } from "flux/utils";
import * as React from "react";

import ReadingsStatsStore from "../../stores/ReadingsStatsStore";
import ValueRange from "../ValueRange";

interface ReadingsStats {
    min: number;
    max: number;
    ave: number;
    count: number;
}

class ReadingsStats extends React.Component <{}, ReadingsStats> {
    public static getStores() {
        return [ReadingsStatsStore];
    }

    public static calculateState(prevState) {
        return ReadingsStatsStore.getState();
    }

    public render() {
        const stats = this.state;
        if (this.state === null) return null;
        return (
            <ValueRange
                min={stats.min}
                max={stats.max}
                ave={stats.ave}
                count={stats.count}
                label=""
            />
        );
    }
}

export default Container.create(ReadingsStats);
