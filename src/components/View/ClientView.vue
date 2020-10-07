<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md10>
        <h2>{{data.first_name}} <small class="grey--text">{{data.last_name}}</small></h2>
        <material-card color="orange" title="Cases" text="">
          <v-data-table :headers="caseHeader" :items="caseItems" hide-actions>
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

        <material-card color="general" title="Manage Profile" text="">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md3>
                  <v-text-field label="Client ID" disabled v-model="data.id" />
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    label="Agent ID"
                    disabled
                    v-model="data.agent_id"
                  />
                </v-flex>
                <v-flex></v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                    v-model="data.first_name"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                    v-model="data.last_name"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="Phone Number"
                    class="purple-input"
                    v-model="data.phone_number"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    label="Email"
                    class="purple-input"
                    v-model="data.email"
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    label="Address 1"
                    class="purple-input"
                    v-model="data.address_1"
                  />
                  <v-text-field
                    label="Address 2"
                    class="purple-input"
                    v-model="data.address_2"
                  />
                  <v-text-field
                    label="Address 3"
                    class="purple-input"
                    v-model="data.address_3"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    label="City"
                    class="purple-input"
                    v-model="data.city"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    label="Country"
                    class="purple-input"
                    v-model="data.country"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"
                    v-model="postal_code"
                  />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="general"
                    @click="onClickUpdate"
                  >
                    Update Profile
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Client from "../../model/Client";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data: () => ({
    id: null,
    data: {
      id: 1,
      first_name: "Wan Zulsarhan",
      last_name: "Wan Shaari",
      phone_number: "0165426191",
    },
    caseHeader: [
      {
        sortable: true,
        text: "ID",
        value: "id",
      },
      {
        sortable: true,
        text: "Running No",
        value: "running_no",
      },
      {
        sortable: true,
        text: "Type",
        value: "type",
        align: "right",
      },
      {
        sortable: false,
        text: "Country",
        value: "country",
        align: "right",
      },
      {
        sortable: false,
        text: "City",
        value: "city",
        align: "right",
      },
    ],
    caseItems: [
      {
        name: "Dakota Rice",
        country: "Niger",
        city: "Oud-Tunrhout",
        salary: "$35,738",
      },
      {
        name: "Minerva Hooper",
        country: "Curaçao",
        city: "Sinaai-Waas",
        salary: "$23,738",
      },
      {
        name: "Sage Rodriguez",
        country: "Netherlands",
        city: "Overland Park",
        salary: "$56,142",
      },
      {
        name: "Philip Chanley",
        country: "Korea, South",
        city: "Gloucester",
        salary: "$38,735",
      },
      {
        name: "Doris Greene",
        country: "Malawi",
        city: "Feldkirchen in Kārnten",
        salary: "$63,542",
      },
    ],
  }),
  mounted() {
    this.id = this.$route.params.id;
  },
  created() {},
  computed: {},
  methods: {
    onClickUpdate() {
      console.log(JSON.stringify(this.data));
    },
  },
};
</script>
