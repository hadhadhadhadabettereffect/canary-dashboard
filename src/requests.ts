import DashboardActionCreators from "./actions/DashboardActionCreators";
import { worker } from "./workerInterface";


export function getReadingsList(device: string) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
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
    req.open("GET", "/devices/" + device + "/readings", true);
    req.send();
}

export function getDeviceList() {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
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

export function postNewReading(data: any) {
    const req = new XMLHttpRequest();
    const id = data.deviceId;
    req.open("POST", "/readings", true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(data));
    req.onload = function() {
        const success = req.status === 201;
        if (success) getReadingsList(id);
        DashboardActionCreators.showMsg({
            success: !!success,
            text: success ? "reading added" : req.responseText
        });
    };
}

export function postNewDevice(data: any) {
    const req = new XMLHttpRequest();
    req.open("POST", "/devices", true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(data));
    req.onload = function() {
        const success = req.status === 201;
        // get updated device list if creation successful
        if (success) getDeviceList();
        DashboardActionCreators.showMsg({
            success: !!success,
            text: success ? "device creation successful" : req.responseText
        });
    };
}

export function deleteDevice(id: string) {
    DashboardActionCreators.deleteDevice(id);
    const req = new XMLHttpRequest();
    req.open("DELETE", "/devices/" + id, true);
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            const success = req.status >= 200 && req.status < 300;
            if (success) getDeviceList();
            DashboardActionCreators.showMsg({
                success: !!success,
                text: success ? "device successfully removed" : req.responseText
            });
        }
    };
    req.send(null);
}
