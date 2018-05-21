import DeviceActionCreators from "./actions/DeviceActionCreators";
import { ClickAction } from "./constants/AppConstants";

document.body.addEventListener("mousedown", function(event) {
    const action = (event.target as HTMLElement).getAttribute("data-action");
    if (action !== null) {
        switch ((action as any) | 0 ) {
            case ClickAction.deviceRow:
                DeviceActionCreators.focus(
                    (event.target as HTMLElement).getAttribute("data-device") as any);
                break;

            case ClickAction.addDevice:
                break;
        }
    }
}, false);
