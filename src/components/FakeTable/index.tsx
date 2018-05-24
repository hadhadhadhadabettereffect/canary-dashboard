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
    const cells: any[] = [];
    for (const d of props.data) {
        const styles = {
            left: w,
            width: d.width
        };
        cells.push(
            React.createElement("div", {
                key: "h" + d.name,
                className: "fable__head",
                style: styles
            }, d.name),
            React.createElement("div", {
                key: "b" + d.name,
                className: "fable__col",
                style: styles
            }, d.text)
        );
        w += d.width;
    }
    return (
        <div className="fable" style={{ width: (w + 20) + "px" }}>
            {cells}
        </div>
    );
}
