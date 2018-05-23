import { ReduceStore } from "flux/utils";
import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";

class ReadingsListStore extends (ReduceStore as any) {
    public getInitialState() {
        return null;
    }

    public reduce(state, action) {
        if (action.type === ActionTypes.readings) {
            return action.data;
        } else if (action.type === ActionTypes.delete) {
            return null;
        }
        return state;
    }
}

export default new (ReadingsListStore as any)(AppDispatcher);
