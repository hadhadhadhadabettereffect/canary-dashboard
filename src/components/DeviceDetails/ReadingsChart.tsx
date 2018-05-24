import { Container } from "flux/utils";
import * as React from "react";

import { LayoutMeasurement } from "../../constants/options";
import ReadingsListStore from "../../stores/ReadingsListStore";
import {
    mountChart,
    setData,
    unmount,
 } from "../Chart";

class ReadingsChart extends React.Component<{}, { values: any; focus: string | null; }> {

    public static getStores() {
        return [ReadingsListStore];
    }

    public static calculateState(prevState) {
        const s = ReadingsListStore.getState();
        if (s !== null) setData(s.values);
        return s;
    }

    chartWrap;

    constructor(props) {
        super(props);
        this.chartWrap = React.createRef();
    }

    componentDidMount() {
        mountChart(this.chartWrap.current);
    }

    componentWillUnmount() {
        unmount();
    }

    render() {
        return (
        <div
            ref={this.chartWrap}
            style={{
                width: LayoutMeasurement.deviceDetailsWidth,
                height: LayoutMeasurement.readingsChartHeight
            }}
        />
    );
    }
}

export default Container.create(ReadingsChart);
