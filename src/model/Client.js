class _Client {
    constructor() {
        this.Table = "client";
        this.ID = "ID";
        this.AgentId = "agent_id";
        this.Email = "email";
        this.FirstName = "first_name";
        this.LastName = "last_name";
        this.PhoneNumber = "phone_number";
        this.CreatedAt = "created_at";
    }
}

const Client = new _Client();
export default Client;