<template>
  <div>
    <div v-if="loading">Loading</div>
    <CoreFormDialog
      v-else
      :iconButton="iconButton"
      :textButton="textButton"
      :textTitle="textTitle"
      :textSave="textSave"
      :textCancel="textCancel"
      :isDone="isDone"
      :item="item"
      :data="data"
      @on-submit="onSubmit"
    ></CoreFormDialog>
  </div>
</template>
<script>
import * as FormHelper from "../../../helper/form-helper";
import { graphqlInsert, graphqlQuery } from "../../../helper/api-helper";
import { globalMethod } from "../../../helper/app-helper";
import AuthHelper from "../../../helper/auth-helper";
import { DataCaseType } from "../../../helper/data-helper";
import Case from "../../../model/Case";
import Policy from "../../../model/Policy";
export default {
  props: {
    clientId: { type: Number },
  },
  data: () => ({
    loading: true,
    isDone: false,
    iconButton: "mdi-account-plus",
    textButton: "Add New Case",
    textTitle: "New Case",
    textSave: "Create",
    textCancel: "Cancel",
    data: {},
    item: [],
  }),
  mounted() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      this.BL_show();
      this.loading = true;

      graphqlQuery(Policy.Table, {
        field: ["policy_no", "type", "ID"],
        param: {
          client_id: this.clientId,
        },
      }).then((data) => {
        let policyData = [{ value: 0, text: "N/A" }];
        policyData.push(
          ...data.map((d, i) => {
            return { value: d.ID, text: d.type + " - " + d.policy_no };
          })
        );
        this.setFormItem(policyData);
        this.loading = false;
        this.BL_hide();
      });
    },
    setFormItem(policyData) {
      this.item = [
        {
          flex: "xs12",
          key: "type",
          label: "Type",
          type: "select",
          items: DataCaseType,
          required: true,
        },
        {
          flex: "xs12",
          key: "running_no",
          label: "Running No.",
          required: true,
        },
        {
          flex: "xs12",
          key: "policy_id",
          label: "Policy",
          hint: "Add new policy under Policy section.",
          type: "select",
          items: policyData,
          required: true,
        },
      ];
    },
    onSubmit(data) {
      console.log("submit");
      data["client_id"] = this.clientId;
      data["agent_id"] = AuthHelper.ID();
      if (!data["policy_id"]) {
        delete data["policy_id"];
      }
      return graphqlInsert(Case.Table, {
        field: ["ID"],
        param: data,
      }).then((data) => {
        this.SB_success("New case created");
        this.isDone = true;
        this.$emit("on-done");
      });
    },
    ...globalMethod(),
  },
};
</script>