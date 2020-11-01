<template>
  <v-container class="fill-height fluid grid-list-xl">
    <v-layout class="justify-center wrap">
      <v-flex xs12>
        <h1>
          {{ user.first_name }}
          <small class="grey--text">{{ user.last_name }}</small>
        </h1>
      </v-flex>
      <v-flex xs12>
        <ViewCaseList :clientId="id" />
      </v-flex>
      <v-flex xs12 md6>
        <ViewPolicyList :clientId="id" />
      </v-flex>
      <v-flex xs12 md6>
        <ViewClientEdit :clientId="id" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { graphqlQuery } from "../../../helper/api-helper";
import Client from "../../../model/Client";
export default {
  data: () => ({
    id: null,
    user: {},
  }),
  created() {
    this.id = this.$route.params.id;
    this.id = Number.parseInt(this.id);
  },
  mounted() {
    this.onLoad();
  },
  computed: {},
  methods: {
    onLoad() {
      graphqlQuery(Client.Table, {
        field: ["first_name", "last_name"],
        param: { ID: this.id },
      }).then((data) => {
        console.log("view", data);
        this.user = data[0];
      });
    },
  },
};
</script>
