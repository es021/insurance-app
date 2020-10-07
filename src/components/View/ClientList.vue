<template>
  <div>
    <CoreTable
      title="Clients"
      subtitle="List of your clients"
      color="general"
      textSearch="Search by name or policy number"
      :offset="offset"
      :fetchCount="fetchCount"
      :fetchData="fetchData"
    >
      <template #addNew>
        <ViewClientAdd />
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
                >Manage Client</v-btn
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
import { mapGetters, mapMutations } from "vuex";
import Client from "../../model/Client";
import { graphqlQuery } from "../../../helper/api-helper";
export default {
  data: () => ({
    offset: 5,
    data: [],
    field: [
      Client.FirstName,
      Client.LastName,
      Client.Email,
      Client.PhoneNumber,
      Client.ID,
      Client.AgentId,
    ],
    headers: [
      {
        text: "Action",
        value: "action",
        align: "left",
        sortable: false,
        isCustom: true,
      },
      { text: "First Name", value: Client.FirstName },
      { text: "Last Name", value: Client.LastName },
      { text: "Email", value: Client.Email },
      { text: "Phone Number", value: Client.PhoneNumber },
      { text: "Client ID", value: Client.ID },
      { text: "Agent ID", value: Client.AgentId },
    ],
  }),
  created() {
    //console.log("search", search);
  },
  computed: {},
  methods: {
    fetchCount({ search }) {
      return graphqlQuery(Client.Table, {
        any: search,
        is_count: true,
      });
    },
    fetchData({ page, offset, search }) {
      return graphqlQuery(Client.Table, {
        any: search,
        field: this.field,
        page: page,
        offset: offset,
        order_by: `${Client.FirstName} asc`,
      }).then((data) => {
        this.data = data;
      });
    },
  },
};
</script>
