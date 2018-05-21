import { ReduceStore } from "flux/utils";
import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";


class DeviceFocusStore extends (ReduceStore as any) {
    public getInitialState() {
        return "";
    }

    public reduce(state, action) {
        if (action.type === ActionTypes.focus) {
            return action.data;
        }
        return state;
    }
}

export default new (DeviceFocusStore as any)(AppDispatcher);
