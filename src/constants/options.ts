
// NOTE yMin must be less than yMax
// yMin cannot be the same as yMax
// since value range being used as a divisor e.g. n/(yMax - yMin);
export const chartOptions = {
    style: {
        width: 400,
        height: 300
    },
    temperature: {
        dataColor: "blue",
        selectionColor: "yellow",
        yMin: -10,
        yMax: 110
    },
    humidity: {
        dataColor: "green",
        selectionColor: "gray",
        yMin: 0,
        yMax: 100
    },
    airquality: {
        dataColor: "yellow",
        selectionColor: "orange",
        yMin: 0,
        yMax: 100
    }
};
