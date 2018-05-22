import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";
import { getDeviceReadings } from "../requests";

const DeviceActionCreators = {

    focus(device: string) {
        getDeviceReadings(device);
        AppDispatcher.dispatch({
            data: device,
            type: ActionTypes.focus
        });
    },

    showMsg(msg: any) {
        AppDispatcher.dispatch({
            data: msg,
            type: ActionTypes.msg
        });
    }

};

export default DeviceActionCreators;
