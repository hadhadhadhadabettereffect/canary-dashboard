import { Dispatcher } from "flux";

class AppDispatcher extends (Dispatcher as any) {
    public dispatch(action = {}) {
        super.dispatch(action);
    }
}

export default new (AppDispatcher as any)();
