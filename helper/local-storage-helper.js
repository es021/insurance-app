import { AppSlug } from "../config/app-config";

class _LocalStorageHelper {
    constructor() {
    }
    key(k) {
        return AppSlug + "-" + k;
    }
    get(k) {
        try {
            return JSON.parse(localStorage.getItem(this.key(k)));
        } catch (err) {
            return {};
        }
    }
    set(k, d) {
        localStorage.setItem(this.key(k), JSON.stringify(d));
    }
    delete(k) {
        localStorage.removeItem(this.key(k))
    }
}

const LocalStorageHelper = new _LocalStorageHelper();
export default LocalStorageHelper;