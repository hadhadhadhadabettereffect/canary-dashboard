import { ReduceStore } from "flux/utils";
import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";


export interface DeviceDetailsState {
    name: string;
    id: string;
    type: string;
}

class DeviceDetailsStore extends ReduceStore<DeviceDetailsState, DeviceDetailsState> {
    getInitialState() {
        return {
            name: "",
            id: "",
            type: ""
        };
    }

    reduce(state, action) {
        if (action.type === ActionTypes.focus) {
            return action.data;
        } else if (action.type === ActionTypes.delete) {
            return {
                name: "",
                id: "",
                type: ""
            };
        }
        return state;
    }
}

export default new (DeviceDetailsStore as any)(AppDispatcher);
