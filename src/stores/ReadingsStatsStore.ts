import { ReduceStore } from "flux/utils";
import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";


class ReadingStatsStore extends (ReduceStore as any) {
    public getInitialState() {
        return null;
    }

    public reduce(state, action) {
        if (action.type === ActionTypes.stats) {
            return action.data;
        } else if (action.type === ActionTypes.delete) {
            return null;
        }
        return state;
    }
}

export default new (ReadingStatsStore as any)(AppDispatcher);
