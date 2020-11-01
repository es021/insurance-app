class _User {
    constructor() {
        this.Table = "user";

        // enum
        this.RoleAgent = "agent";
        this.RoleManager = "manager";
    }
}

const User = new _User();
// module.exports = User
export default User;