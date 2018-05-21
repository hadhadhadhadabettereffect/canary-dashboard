import * as React from "react";

function DeviceRow({ name, type, value }) {
    return (
        <tr>
            <td>{name}</td>
            <td>{type}</td>
            <td>{value}</td>
        </tr>
    );
}

export default DeviceRow;
