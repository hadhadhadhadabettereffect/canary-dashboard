import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";
import { getReadingsList } from "../requests";

const DashboardActionCreators = {

    focus(deviceData: any) {
        getReadingsList(deviceData.id);
        AppDispatcher.dispatch({
            data: deviceData,
            type: ActionTypes.focus
        });
    },

    showMsg(msg: any) {
        AppDispatcher.dispatch({
            data: msg,
            type: ActionTypes.msg
        });
    },

    deleteDevice(id: string) {
        AppDispatcher.dispatch({
            data: id,
            type: ActionTypes.delete
        });
    }

};

export default DashboardActionCreators;
