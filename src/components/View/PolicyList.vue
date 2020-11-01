<template>
  <div>
    <CoreTable
      :key="tableKey"
      title="Policy"
      color="indigo"
      textSearch="Search by type or policy number"
      :offset="offset"
      :fetchCount="fetchCount"
      :fetchData="fetchData"
    >
      <template #addNew>
        <ViewPolicyAdd :clientId="clientId" @on-done="onDoneAdd" />
      </template>
      <template #table>
        <v-data-table
          hide-actions
          :headers="headers"
          :items="data"
          class="elevation-1"
        >
          <template slot="headerCell" slot-scope="{ header }">
            <span
              class="subheading font-weight-light text-general text--darken-3"
              v-text="header.text"
            />
          </template>
          <template v-slot:items="props">
            <td>
              <!-- :to="'/dashboard/policy/' + props.item.ID" -->
              <v-btn small color="white" outline :to="'/dashboard/not-ready'"
                >View / Manage</v-btn
              >
            </td>
            <td v-for="f of field" :key="f">
              {{ props.item[f] }}
            </td>
          </template>
        </v-data-table>
      </template>
    </CoreTable>
  </div>
</template>

<script>
import router from "@/router";
import Policy from "../../../model/Policy";
import { graphqlQuery } from "../../../helper/api-helper";
import AuthHelper from "../../../helper/auth-helper";
export default {
  props: {
    clientId: {
      type: Number,
    },
  },
  data: () => ({
    tableKey: 0,
    offset: 2,
    data: [],
    field: ["ID", "type", "policy_no"],
    headers: [
      {
        text: "Action",
        value: "action",
        align: "left",
        sortable: false,
        isCustom: true,
      },
      { text: "ID", value: "ID", sortable: false },
      { text: "Type", value: "type", sortable: false },
      { text: "Policy No", value: "policy_no", sortable: false },
    ],
  }),
  created() {
    //console.log("search", search);
  },
  computed: {},
  methods: {
    onDoneAdd() {
      this.tableKey++;
    },
    param() {
      return {
        client_id: this.clientId,
      };
    },
    fetchCount({ search }) {
      return graphqlQuery(Policy.Table, {
        any: search,
        param: this.param(),
        is_count: true,
      });
    },
    fetchData({ page, offset, search }) {
      return graphqlQuery(Policy.Table, {
        param: this.param(),
        any: search,
        field: this.field,
        page: page,
        offset: offset,
        order_by: `ID desc`,
      }).then((data) => {
        this.data = data;
      });
    },
  },
};
</script>

