import DeviceActionCreators from "./actions/DeviceActionCreators";
import { worker } from "./workerInterface";


export function getDeviceReadings(device: string) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        let res;
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            try {
                res = JSON.parse(req.responseText);
            } catch (e) {
                throw e();
            }
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
            } catch (e) {
                throw e();
            }
            worker.postMessage({
                data: res,
                type: "list"
            });
        }
    };
    req.open("GET", "/devices");
    req.send();
}

export function postNewDevice(dataString: string) {
    const req = new XMLHttpRequest();
    req.open("POST", "/devices");
    req.setRequestHeader("Content-type", "application/json");
    req.send(dataString);
    req.onload = function() {
        DeviceActionCreators.showMsg({
            success: req.status === 201,
            text: req.status === 201 ? "device creation successful" : req.responseText
        });
     };
}
