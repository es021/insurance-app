<template>
  <div>
    <material-card color="orange" title="Cases" text="">
      <v-data-table :headers="headers" :items="items" hide-actions>
        <template slot="headerCell" slot-scope="{ header }">
          <span
            class="font-weight-light text-warning text--darken-3"
            v-text="header.text"
          />
        </template>
        <template slot="items" slot-scope="{ index, item }">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td class="text-xs-right">{{ item.salary }}</td>
          <td class="text-xs-right">{{ item.country }}</td>
          <td class="text-xs-right">{{ item.city }}</td>
        </template>
      </v-data-table>
    </material-card>
  </div>
</template>

<script>
import router from "@/router";
import { mapGetters, mapMutations } from "vuex";
import Client from "../../model/Client";
export default {
  data: () => ({
    headers: [],
    data:[],
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
      router.push("/control/dasboard/client/" + 1);
    },
    ...mapMutations("data", ["setClients"]),
  },
};
</script>
