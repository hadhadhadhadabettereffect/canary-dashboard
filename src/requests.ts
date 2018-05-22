import { worker } from "./workerInterface";

export function getDeviceReadings(device: string) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        let res;
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            try {
                res = JSON.parse(req.responseText);
            } catch (e) { throw e(); }
            worker.postMessage({
                data: res,
                type: "readings"
            });
        }
    };
    req.open("GET", "/devices/" + device + "/readings");
    req.send();
}

export function getDeviceList() {
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        let res;
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            try {
                res = JSON.parse(req.responseText);
            } catch (e) { throw e(); }
            worker.postMessage({
                data: res,
                type: "list"
            });
        }
    };
    req.open("GET", "/devices");
    req.send();
}
