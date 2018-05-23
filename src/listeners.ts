import DashboardActionCreators from "./actions/DashboardActionCreators";
import { ClickTarget } from "./constants/AppConstants";


document.body.addEventListener("mousedown", function(event: MouseEvent) {
    const target = (event.target as HTMLElement).getAttribute("data-target");

    if (target !== null) {
        switch ((target as any) | 0 ) {
            case ClickTarget.deviceRow:
                handleRowClick(event);
                break;

            case ClickTarget.chart:
                console.log("start chart");
                break;
        }
    }
}, false);

function handleRowClick(event: MouseEvent) {
    const deviceData = {
        id: (event.target as HTMLElement).getAttribute("data-id"),
        name: (event.target as HTMLElement).getAttribute("data-name"),
        type: (event.target as HTMLElement).getAttribute("data-type"),
    };

    if (deviceData.id !== null ||
        deviceData.name !== null ||
        deviceData.type !== null) {
            DashboardActionCreators.focus(deviceData);
        }
}
