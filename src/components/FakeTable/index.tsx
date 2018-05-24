import * as React from "react";

import "./FakeTable.css";


interface FableColProps {
    name: string;
    text: string;
    width: number;
}

interface FableProps {
    data: FableColProps[];
}

export default function Fable(props: FableProps) {
    let w = 0;
    const thead = props.data.map((d) => {
        const styles = {
            left: w + "px",
            width: d.width + "px"
        };
        w += d.width;
        return (
        <div
            key={"h_" + d.name}
            className="fabel__col--head"
            style={styles}
        >
            {d.name}
        </div>);
    });
    w = 0;
    const tbody = props.data.map((d) => {
        const styles = {
            left: w + "px",
            width: d.width + "px"
        };
        w += d.width;
        return (
            <div
                key={"b_" + d.name}
                className="fabel__col--body"
                style={styles}
            >
                {d.text}
            </div>);
    });

    return (
        <div className="fabel" style={{ width: (w + 20) + "px" }}>
            <div className="fabel__head">
                {thead}
            </div>
            <div className="fabel__body">
                {tbody}
            </div>
        </div>
    );
}
