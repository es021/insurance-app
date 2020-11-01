<template>
  <v-container>
    <v-layout>
      <v-flex md12>
        <CoreTable
          :key="tableKey"
          title="Clients"
          subtitle="List of your clients"
          color="general"
          textSearch="Search by name or policy number"
          :offset="offset"
          :fetchCount="fetchCount"
          :fetchData="fetchData"
        >
          <template #addNew>
            <ViewClientAdd :agentId="agentId" @on-done="onDoneAdd" />
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
                  <v-btn
                    small
                    color="white"
                    outline
                    :to="'/dashboard/client/' + props.item.ID"
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from "@/router";
import Client from "../../../model/Client";
import { graphqlQuery } from "../../../helper/api-helper";
import AuthHelper from "../../../helper/auth-helper";
export default {
  data: () => ({
    tableKey: 0,
    agentId: AuthHelper.agentId(),
    offset: 5,
    data: [],
    field: [
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "ID",
      "agent_id",
    ],
    headers: [
      {
        text: "Action",
        value: "action",
        align: "left",
        sortable: false,
        isCustom: true,
      },
      { text: "First Name", value: "first_name", sortable: false },
      { text: "Last Name", value: "last_name", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "Phone Number", value: "phone_number", sortable: false },
      { text: "Client ID", value: "ID", sortable: false },
      { text: "Agent ID", value: "agent_id", sortable: false },
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
        agent_id: AuthHelper.ID(),
      };
    },
    fetchCount({ search }) {
      return graphqlQuery(Client.Table, {
        any: search,
        is_count: true,
        param: this.param(),
      });
    },
    fetchData({ page, offset, search }) {
      return graphqlQuery(Client.Table, {
        any: search,
        param: this.param(),
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
