import { Container } from "flux/utils";
import * as React from "react";

import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";

import { readingFormFields } from "../../constants/formfields";
import { LayoutMeasurement } from "../../constants/options";
import { postNewReading } from "../../requests";
import ReadingsListStore from "../../stores/ReadingsListStore";
import DeviceDetailsStore from "../../stores/DeviceDetailsStore";
import FakeTable from "../FakeTable";
import PopupForm from "../PopupForm";


function createReading(data) {
    postNewReading(Object.assign({
        deviceId: DeviceDetailsStore.getState().id,
        type: DeviceDetailsStore.getState().type
    }, data));
}

class ReadingsList extends React.Component<{}, {dates, values}> {
    public static getStores() {
        return [ReadingsListStore];
    }

    public static calculateState(prevState) {
        return ReadingsListStore.getState();
    }

    public render() {
        const tableDefs = [{
                name: "created at",
                text: this.state.dates || "",
                width: LayoutMeasurement.colWidthCreatedAt
            }, {
                name: "value",
                text: this.state.values ? this.state.values.join("\n") : "",
                width: LayoutMeasurement.colWidthValue
            }];
        return (
            <Paper>
                <PopupForm
                    fields={readingFormFields}
                    handleSubmit={createReading}
                    label="add reading"
                    buttonContent={<AddIcon/>}
                />
                <div style={{width: LayoutMeasurement.deviceDetailsWidth}}>
                    <FakeTable data={tableDefs} />
                </div>
            </Paper>
        );
    }
}

export default Container.create(ReadingsList);
