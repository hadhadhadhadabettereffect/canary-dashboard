import { ReduceStore } from "flux/utils";
import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";


class DeviceListStore extends (ReduceStore as any) {
    public getInitialState() {
        return [];
    }

    public reduce(state, action) {
        switch (action.type) {
            case ActionTypes.expand:
                return state;

            case ActionTypes.load:
                return action.data;
        }
        return state;
    }
}

export default new (DeviceListStore as any)(AppDispatcher);
