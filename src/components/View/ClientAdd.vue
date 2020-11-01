<template>
  <CoreFormDialog
    :iconButton="iconButton"
    :textButton="textButton"
    :textTitle="textTitle"
    :textSave="textSave"
    :textCancel="textCancel"
    :ps="ps"
    :isDone="isDone"
    :item="formItem"
    :data="formData"
    @on-submit="onSubmit"
  ></CoreFormDialog>
</template>
<script>
import { graphqlInsert } from "../../../helper/api-helper";
import { globalMethod } from "../../../helper/app-helper";
import Client from "../../../model/Client";
export default {
  props: {
    agentId: { type: Number },
  },
  data: () => ({
    isDone: false,
    iconButton: "mdi-account-plus",
    textButton: "Add New Client",
    textTitle: "New Client",
    textSave: "Create",
    textCancel: "Cancel",
    ps: "** More information can be added later **",
    formData: {},
    formItem: [
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
      // {
      //   flex: "xs12",
      //   key: "age",
      //   label: "Age",
      //   type: "number",
      //   required: true,
      // },
      // {
      //   flex: "xs12",
      //   key: "detail",
      //   label: "Detail",
      //   type: "textarea",
      //   required: true,
      // },
    ],
  }),
  methods: {
    ...globalMethod(),
    onSubmit(data) {
      data["agent_id"] = this.agentId;
      // empty the data
      // this.formData = {};
      console.log("Data", data);

      return graphqlInsert(Client.Table, {
        field: ["ID"],
        param: data,
      }).then((data) => {
        this.data = data;
        this.SB_success("New client created");
        // window.reload();
        // empty the data
        this.isDone = true;
        this.$emit("on-done");
      });
    },
  },
};
</script>