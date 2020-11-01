<template>
  <material-card color="orange" text="">
    <template #header>
      <h2 class="heading-2 font-weight-bold mb-2" v-text="'Manage Profile'" />
    </template>
    <CoreForm :data="data" :item="item" @on-init="onFormInit" :error="error" />
    <v-flex xs12 text-xs-right>
      <v-btn
        class="mx-0 font-weight-light"
        color="general"
        @click="onClickSubmit"
      >
        Update Profile
      </v-btn>
    </v-flex>
  </material-card>
</template>

<script>
import * as FormHelper from "../../../helper/form-helper";
import { graphqlQuery, graphqlUpdate } from "../../../helper/api-helper";
import { DataState } from "../../../helper/data-helper";
import { globalMethod } from "../../../helper/app-helper";
import Client from "../../../model/Client";
export default {
  props: {
    clientId: {
      type: Number,
    },
  },
  data: () => ({
    formElement: null,
    data: {},
    item: [
      {
        flex: "xs12 sm6",
        key: "first_name",
        label: "First Name",
        required: true,
      },
      {
        flex: "xs12 sm6",
        key: "last_name",
        label: "Last Name",
        required: true,
      },
      {
        flex: "xs12",
        key: "email",
        label: "Email",
        type: "email",
        required: true,
      },
      {
        flex: "xs12 sm6",
        key: "phone_number",
        label: "Phone Number",
        required: true,
      },
      {
        flex: "xs12 sm6",
        key: "age",
        label: "Age",
        type: "number",
      },
      {
        flex: "xs12",
        key: "address_1",
        label: "Address 1",
      },
      {
        flex: "xs12",
        key: "address_2",
        label: "Address 2",
      },
      {
        flex: "xs12 sm4",
        key: "postcode",
        label: "Postcode",
        type: "number",
      },
      {
        flex: "xs12 sm4",
        key: "city",
        label: "City",
      },
      {
        flex: "xs12 sm4",
        key: "state",
        type: "select",
        items: DataState,
        label: "State",
      },
    ],
  }),
  mounted() {
    this.onLoad();
  },
  computed: {},
  methods: {
    ...globalMethod(),
    onLoad() {
      this.BL_show();
      console.log(this.clientId);
      graphqlQuery(Client.Table, {
        field: [
          "ID",
          "agent_id",
          "first_name",
          "last_name",
          "email",
          "phone_number",
          "age",
          "address_1",
          "address_2",
          "postcode",
          "city",
          "state",
        ],
        param: { ID: this.clientId },
      }).then((data) => {
        console.log("view", data);
        this.data = data[0];
        this.BL_hide();
      });
    },
    onFormInit(formElement) {
      this.formElement = formElement;
    },
    onClickSubmit() {
      let error = FormHelper.checkError(
        this,
        this.formElement,
        this.item,
        this.data
      );
      if (error) {
        this.error = error;
      } else {
        this.error = null;
        let data = FormHelper.fix(this.item, this.data);
        console.log("data", data);
        data["ID"] = this.clientId;
        this.BL_show();
        graphqlUpdate(Client.Table, { field: ["ID"], param: data }).then(
          (res) => {
            console.log("update", res);
            this.BL_hide();
            this.SB_success("Client profile updated.");
          }
        );
      }
    },
  },
};
</script>
