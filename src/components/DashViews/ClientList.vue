<template>
  <div>
    <!-- kena set storeSetFunction jugak kat map mutations -->
    <CoreTable
      title="Clients"
      storeSetFunction="setClients"
      subtitle="List of your clients"
      color="general"
      newText="Add New Client"
      :fetchData="fetchData"
    >
      <template #table>
        <v-data-table
          :headers="headers"
          :items="clients"
          :rows-per-page-items="rowsAmount"
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
                :data-id="props.item.id"
                small
                color="indigo"
                dark
                @click="viewOnClick"
                ><b>View Profile</b></v-btn
              >
            </td>
            <td>{{ props.item.firstName }}</td>
            <td>{{ props.item.lastName }}</td>
            <td>{{ props.item.phoneNumber }}</td>
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.agentId }}</td>
          </template>
        </v-data-table>
      </template>
    </CoreTable>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Client from "../../model/Client";
export default {
  data: () => ({
    rowsAmount: [
      15,
      20,
      25,
      { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 },
    ],
    headers: [
      { text: "Action", value: "action", align: "left", sortable: false },
      { text: "First Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Phone Number", value: "phoneNumber" },
      { text: "Client Id", align: "left", value: "id" },
      { text: "Agent ID", value: "agentId" },
    ],
    fetchData: (search) => {
      console.log("fetchData search", search);
      Client.init();
      return Client.get({ limit: 99, orderBy: Client.FirstName }).then(
        (data) => {
          return data;
        }
      );
    },
  }),
  created() {},
  computed: {
    ...mapGetters("data", ["clients"]),
  },
  methods: {
    viewOnClick(e) {
      let id = e.currentTarget.dataset.id;
      console.log("grak lu", id);
    },
    ...mapMutations("data", ["setClients"]),
  },
};
</script>
