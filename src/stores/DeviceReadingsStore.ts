import { ReduceStore } from "flux/utils";
import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";


class DeviceReadingsStore extends (ReduceStore as any) {
    public getInitialState() {
        return null;
    }

    public reduce(state, action) {
        if (action.type === ActionTypes.readings) {
            return action.data;
        }
        return state;
    }
}

export default new (DeviceReadingsStore as any)(AppDispatcher);
