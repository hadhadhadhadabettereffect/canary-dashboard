import { ReduceStore } from "flux/utils";
import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";


class FlashMsgStore extends (ReduceStore as any) {
    public getInitialState() {
        return {
            success: true,
            text: ""
        };
    }

    public reduce(state, action) {
        if (action.type === ActionTypes.msg) {
            return action.data;
        }
        return state;
    }
}

export default new (FlashMsgStore as any)(AppDispatcher);
