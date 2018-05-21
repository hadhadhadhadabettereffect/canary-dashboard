import { ActionTypes } from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";

const DeviceActionCreators = {

    expand(row: number) {
        AppDispatcher.dispatch({
            data: row,
            type: ActionTypes.expand
        });
    },

    getList() {
        const req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            let res;
            if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                try {
                    res = JSON.parse(req.responseText);
                } catch (e) {
                    throw e();
                }
                AppDispatcher.dispatch({
                    data: res,
                    type: ActionTypes.load
                });
            }
        };
        req.open("GET", "https://fullstack-challenge-api.herokuapp.com/devices");
        req.send();
    }

};

export default DeviceActionCreators;
