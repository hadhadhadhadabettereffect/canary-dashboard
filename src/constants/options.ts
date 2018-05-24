// NOTE yMin must be less than yMax
// yMin cannot be the same as yMax
// since value range being used as a divisor e.g. n/(yMax - yMin);
export const chartOptions = {
    temperature: {
        dataColor: "#00cd69",
        selectionColor: "#ffff5f",
        yMin: -10,
        yMax: 110
    },
    humidity: {
        dataColor: "#0096e6",
        selectionColor: "gray",
        yMin: 0,
        yMax: 100
    },
    airquality: {
        dataColor: "#00cd69",
        selectionColor: "#0096e6",
        yMin: 0,
        yMax: 100
    }
};

export const enum LayoutMeasurement {
    deviceListWidth = 400,
    deviceDetailsWidth = 400,
    readingsChartHeight = 300,

    colWidthCreatedAt = 300,
    colWidthValue = 100,

    tableHeadHeight = 40,
}
