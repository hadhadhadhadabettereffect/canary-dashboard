import { Container } from "flux/utils";
import * as React from "react";

import ReadingsListStore from "../stores/ReadingsListStore";
import FakeTable from "./FakeTable";


class ReadingsList extends React.Component<{}, {data}> {
    public static getStores() {
        return [ReadingsListStore];
    }

    public static calculateState(prevState) {
        return {
            data: ReadingsListStore.getState()
        };
    }

    public render() {
        const data = this.state.data;
        if (data === null) return null;
        const tableDefs = [{
                name: "created at",
                text: data.dates,
                width: 230
            }, {
                name: "value",
                text: data.values.join("\n"),
                width: 70
            }];
        return (
            <div style={{width: "300px", height: "500px"}}>
                <FakeTable data={tableDefs} />
            </div>
        );
    }

}

export default Container.create(ReadingsList);
