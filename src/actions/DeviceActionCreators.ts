import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";

// device list api req
const req = new XMLHttpRequest();
req.onreadystatechange = () => {
    let res;
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
        try {
            res = JSON.parse(req.responseText);
        } catch (e) { throw e(); }
        AppDispatcher.dispatch({
            data: res,
            type: ActionTypes.load
        });
    }
};
req.open("GET", "/devices");


const DeviceActionCreators = {

    expand(row: number) {
        console.log(row);
        AppDispatcher.dispatch({
            data: row,
            type: ActionTypes.expand
        });
    },

    getList() {
        req.send();
    },

};

export default DeviceActionCreators;
