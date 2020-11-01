<template>
  <CoreFormDialog
    :iconButton="iconButton"
    :textButton="textButton"
    :textTitle="textTitle"
    :textSave="textSave"
    :textCancel="textCancel"
    :ps="ps"
    :isDone="isDone"
    :item="item"
    :data="data"
    @on-submit="onSubmit"
  ></CoreFormDialog>
</template>
<script>
import * as FormHelper from "../../../helper/form-helper";
import { graphqlInsert } from "../../../helper/api-helper";
import { globalMethod } from "../../../helper/app-helper";
import { DataPolicyType } from "../../../helper/data-helper";
import Policy from "../../../model/Policy";
export default {
  props: {
    clientId: { type: Number },
  },
  data: () => ({
    isDone: false,
    iconButton: "mdi-account-plus",
    textButton: "Add New Policy",
    textTitle: "New Policy",
    textSave: "Create",
    textCancel: "Cancel",
    ps: "** More information can be added later **",
    data: {},
    item: [
      {
        flex: "xs12",
        key: "type",
        type: "select",
        items: DataPolicyType,
        label: "Type",
        required: true,
      },
      {
        flex: "xs12",
        key: "policy_no",
        label: "Policy No.",
        required: true,
      },
    ],
  }),
  methods: {
    ...globalMethod(),
    onSubmit(data) {
      data["client_id"] = this.clientId;
      return graphqlInsert(Policy.Table, {
        field: ["ID"],
        param: data,
      }).then((data) => {
        this.data = data;
        this.SB_success("New policy created");
        this.isDone = true;
        this.$emit("on-done");
      });
    },
  },
};
</script>