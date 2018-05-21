import DeviceActionCreators from "./actions/DeviceActionCreators";
import { ClickAction } from "./constants/AppConstants";

document.body.addEventListener("click", function(event) {
    const action = (event.target as HTMLElement).getAttribute("data-action");
    if (action !== null) {
        switch ((action as any) | 0 ) {
            case ClickAction.deviceRow:
                DeviceActionCreators.expand(
                    (((event.target as HTMLElement).getAttribute("data-row") as any) | 0));
                break;
        }
    }
}, false);
