import { ActionTypes } from "./constants/AppConstants";
import AppDispatcher from "./dispatcher/AppDispatcher";

const worker = new Worker("worker.js");


worker.onmessage = function(msg) {
    switch (msg.data.type) {
        case "stats":
            AppDispatcher.dispatch({
                data: msg.data.data,
                type: ActionTypes.stats
            });
            break;
    }
};

export function postMessage(msg) {
    worker.postMessage(msg);
}
