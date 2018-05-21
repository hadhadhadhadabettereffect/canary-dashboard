import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";
import { postMessage } from "../workerInterface";

const DeviceActionCreators = {

    focus(device: string) {
        getDeviceData(device);
        AppDispatcher.dispatch({
            data: device,
            type: ActionTypes.focus
        });
    },

    getList() {
        const req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            let res;
            if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                try {
                    res = JSON.parse(req.responseText);
                } catch (e) { throw e(); }
                postMessage({
                    data: res,
                    type: "stats"
                });
                AppDispatcher.dispatch({
                    data: res,
                    type: ActionTypes.load
                });
            }
        };
        req.open("GET", "/devices");
        req.send();
    }
};

function getDeviceData(device: string) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        let res;
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            try {
                res = JSON.parse(req.responseText);
            } catch (e) { throw e(); }
            AppDispatcher.dispatch({
                data: res,
                type: ActionTypes.details
            });
        }
    };
    req.open("GET", "/devices/" + device);
    req.send();
}

export default DeviceActionCreators;
