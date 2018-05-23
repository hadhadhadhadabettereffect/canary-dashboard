import { Container } from "flux/utils";
import * as React from "react";

import ReadingsListStore from "../stores/ReadingsListStore";
import FakeTable from "./FakeTable";


class ReadingsList extends React.Component<{}, {dates, values}> {
    public static getStores() {
        return [ReadingsListStore];
    }

    public static calculateState(prevState) {
        return ReadingsListStore.getState();
        // {
        //     data: ReadingsListStore.getState()
        // };
    }

    public render() {
        // const data = this.state.data;
        if (!this.state.values) return null;
        const tableDefs = [{
                name: "created at",
                text: this.state.dates,
                width: 230
            }, {
                name: "value",
                text: this.state.values.join("\n"),
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
