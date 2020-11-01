import router from "../src/router/index";
import User from "../model/User";
import LocalStorageHelper from "./local-storage-helper";
import { postRequest } from './api-helper';

class _AuthHelper {
    constructor() {
    }

    login(form) {
        console.log("LOGINNNNNNNN")
        return postRequest({
            url: "/auth/login", param: {
                email: form.email,
                password: form.password,
            }
        }).then(res => {
            let userData = res.data;
            LocalStorageHelper.set("auth", userData);
            router.push("/dashboard");
            return userData;
        }).catch(err => {
            LocalStorageHelper.delete("auth");
            if (err.response && err.response.data) {
                throw err.response.data;
            }
            throw "Server Error";
        })
    }
    async logout() {
        LocalStorageHelper.delete("auth");
        router.push("/");
    }
    user() {
        let toRet = LocalStorageHelper.get("auth");
        return toRet ? toRet : {};
    }

    isLoggedIn() {
        return LocalStorageHelper.get("auth") != null;
    }

    isRoleAgent() {
        return this.role() == User.RoleAgent;
    }

    isRoleManager() {
        return this.role() == User.RoleManager;
    }

    ID() {
        return this.user().ID;
    }

    agentId() {
        return this.user().agent_id;
    }

    role() {
        return this.user().ID;
    }

    token() {
        return this.user().token;
    }
}

const AuthHelper = new _AuthHelper();
export default AuthHelper;