import { ActionTypes } from "./constants/AppConstants";
import AppDispatcher from "./dispatcher/AppDispatcher";

export const worker = new Worker("worker.js");

worker.onmessage = function(msg) {
    switch (msg.data.type) {
        case "list":
            AppDispatcher.dispatch({
                data: msg.data.data,
                type: ActionTypes.load
            });
            break;

        case "stats":
            AppDispatcher.dispatch({
                data: msg.data.data,
                type: ActionTypes.stats
            });
            break;

        case "readings":
            AppDispatcher.dispatch({
                data: msg.data.data,
                type: ActionTypes.readings
            });
            break;
    }
};
