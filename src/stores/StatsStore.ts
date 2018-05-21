import { ReduceStore } from "flux/utils";
import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";


class StatsStore extends (ReduceStore as any) {
    public getInitialState() {
        return null;
    }

    public reduce(state, action) {
        if (action.type === ActionTypes.stats) {
            return action.data;
        }
        return state;
    }
}

export default new (StatsStore as any)(AppDispatcher);
