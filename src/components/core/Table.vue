<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <div>
          <material-card :color="color" :title="title" :text="subtitle">
            <v-btn color="success" dark class="mt-2 mb-3" @click="onClickAddButton">{{
              newText
            }}</v-btn>
            <v-spacer />
            <v-text-field
              v-model="searchInput"
              @keypress="onKeyPressSearch"
              append-icon="search"
              label="Search by name or policy number"
              single-line
              hide-details
            />
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="editedItem.username"
                          label="Username"
                        />
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="editedItem.password"
                          label="Password"
                        />
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                        />
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-checkbox
                          v-model="checkboxAdmin"
                          :label="`IsAdmin`"
                        />
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-checkbox
                          v-model="checkboxActive"
                          :label="`IsActive`"
                        />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn color="blue darken-1" flat @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- :search="searchInput" -->
            <slot name="table"></slot>

            <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
              {{ snackText }}
              <v-btn flat @click="snack = false">Close</v-btn>
            </v-snackbar>
          </material-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    color: {
      type: String,
    },
    storeSetFunction: {
      type: String,
    },
    fetchData: {
      type: Function,
    },
    newText: {
      type: String,
      default: "Add New",
    },
  },
  data: () => ({
    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: (v) => v.length <= 25 || "Input too long!",
    pagination: {},
    checkboxAdmin: true,
    checkboxActive: true,
    rowsAmount: [
      15,
      20,
      25,
      { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 },
    ],
    dialog: false,
    searchInput: "",
    headers: [
      { text: "Id", align: "left", value: "id" },
      // { text: "-----Actions-----", value: "actions", sortable: false },
      { text: "username", value: "username" },
      { text: "email", value: "email" },
      { text: "isAdmin", value: "isAdmin" },
      { text: "isActive", value: "isActive" },
      { text: "lastSeen", value: "lastSeen" },
      { text: "password", value: "password" },
    ],
    editedIndex: -1,
    editedItem: {
      username: "",
      password: "",
      email: "",
      isAdmin: true,
      isActive: true,
    },
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  // called when page is created before dom
  created() {
    this.innerFetchData();
  },
  methods: {
    ...mapMutations("block-loader", ["BL_show", "BL_hide"]),
    ...mapMutations("data", ["setClients"]),
    innerFetchData(search) {
      this.BL_show();
      this.fetchData(search).then((data) => {
        this.BL_hide();
        console.log("this.storeSetFunction", this.storeSetFunction)
        this[this.storeSetFunction](data);
      });
    },
    onClickAddButton(e){

    },
    onKeyPressSearch(e) {
      if (e.key == "Enter") {
        // @SEARCH_FEATURE
        console.log("start Search", this.searchInput);
        this.innerFetchData(this.searchInput);
      }
    },
    // getusernames() {
    //   this.$http
    //     .get("/users")
    //     .then((response) => {
    //       this.UserList = response.data.Users;
    //     })
    //     .catch((error) => console.log(error));
    // },

    // object.assign fills in the empty object with the properties of item
    editItem(item, dbox = true) {
      this.editedIndex = this.UserList.indexOf(item);
      item.isAdmin = this.checkboxAdmin;
      item.isActive = this.checkboxActive;
      this.editedItem = Object.assign({}, item);
      this.dialog = dbox;
    },

    callTableAction(item, endpoint, method) {
      let tableItem = this.editedItem;
      this.$store
        .dispatch("updateTableItem", { endpoint, tableItem, method })
        .then((response) => this.saveInline())
        .catch((error) => {
          console.log(error);
          this.cancelInline;
        });
    },

    deleteItem(item) {
      const index = this.UserList.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.UserList.splice(index, 1);
      this.editedItem = Object.assign({}, item);
      let endpoint = `users/delete/${this.editedItem.username}`;
      let method = "delete";
      this.callTableAction(item, endpoint, method);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.UserList[this.editedIndex], this.editedItem);
        let tableItem = this.editedItem;
        let endpoint = `users/update/${this.editedItem.username}`;
        let method = "patch";
        this.$store
          .dispatch("updateTableItem", { endpoint, tableItem, method })
          .then((response) => this.saveInline())
          .catch((error) => {
            console.log(error);
            this.cancelInline;
          });
      } else {
        let tableItem = this.editedItem;
        this.UserList.push(this.editedItem);
        let endpoint = `users/new-user`;
        let method = "post";
        this.$store
          .dispatch("updateTableItem", { endpoint, tableItem, method })
          .then((response) => console.log("new user"))
          .catch((error) => {
            console.log(error);
            this.cancelInline;
          });
      }
      this.close();
    },
    // toasts/snackbar messages for actions
    saveInline() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancelInline() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    reset() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data reset to default";
    },
    openInline() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    closeInline() {
      console.log("Dialog closed");
    },
  },
};
</script>

<style>
table.v-table thead tr {
  color: red !important;
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
