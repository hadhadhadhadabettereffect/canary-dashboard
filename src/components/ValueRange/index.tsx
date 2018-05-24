import * as React from "react";

import {
    Typography
} from "@material-ui/core";

import "./ValueRange.css";


interface ValueRangeProps {
    min: number;
    max: number;
    ave: number;
    count: number;
    label: string;
}

/**
 * displays min, max, and average values
 */
export default function ValueRange(props: ValueRangeProps) {
    return (
        <div className="valuerange">
            <div className="valuerange__label">
                <Typography variant="subheading">
                    {props.label}
                </Typography>
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
                <Typography variant="caption">ave</Typography>
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
