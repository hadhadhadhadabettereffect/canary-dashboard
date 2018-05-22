import * as React from "react";

// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import "./ValueRange.css";


interface ValueRangeProps {
    min: number;
    max: number;
    ave: number;
    count: number;
}

/**
 * displays min, max, and average values
 */
function ValueRange(props: ValueRangeProps) {
    return (
        <div className="valuerange">
            <div className="valuerange__cell">
                <Typography>
                    {props.count}
                </Typography>
                <Typography variant="caption">total</Typography>
            </div>
            <div className="valuerange__cell">
                <Typography>
                    {props.min}
                </Typography>
                <Typography variant="caption">low</Typography>
            </div>
            <div className="valuerange__cell">
                <Typography>
                    {props.ave}
                </Typography>
                <Typography variant="caption">average</Typography>
            </div>
            <div className="valuerange__cell">
                <Typography>
                    {props.max}
                </Typography>
                <Typography variant="caption">high</Typography>
            </div>
        </div>
    );
}

export default ValueRange;
