// non export just extends prototype

import { mapGetters, mapMutations, mapState } from "vuex";
import { AppName } from "../config/app-config";

export function windowTitle(title) {
    return title + " | " + AppName
}

export function globalComputed() {
    return {
        ...mapGetters("snackbar", ["SB_state"]),
        ...mapState('app', ['image', 'color']),
        ...mapGetters("block-loader", ["BL_isShow"]),
    }
}

export function globalMethod() {
    return {
        ...mapMutations('app', ['APP_setDrawer', 'APP_toggleDrawer']),
        ...mapMutations("block-loader", ["BL_show", "BL_hide"]),
        ...mapMutations("snackbar", ["SB_show", "SB_success", "SB_error", "SB_hide"]),
    }
}