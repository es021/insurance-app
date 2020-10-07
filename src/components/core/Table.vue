<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <div>
          <!-- <material-card :color="color" :title="title" :text="subtitle"> -->
          <material-card :color="color">
            <template #header>
              <h1 class="heading-1 font-weight-bold mb-2" v-text="title" />
              <slot name="addNew"></slot>
            </template>
            <v-layout row wrap>
              <v-flex xs12 sm9 lg10>
                <v-text-field
                  v-model="searchInput"
                  :label="textSearch"
                  single-line
                  hide-details
                  @keypress="onKeypressSearchInput"
                />
              </v-flex>
              <v-flex xs12 sm3 lg2 class="align-self-end">
                <v-btn
                  block
                  color="success"
                  dark
                  class="my-0 font-weight-bold"
                  @click="onClickSearchButton"
                >
                  <v-icon left dark>mdi-magnify</v-icon>
                  Search
                </v-btn>
              </v-flex>
            </v-layout>
            <v-spacer class="mt-3" />
            <CorePaging
              :hideTop="this.offset < 10"
              :totalPage="totalPage"
              @onPageChange="onPageChange"
            >
              <slot name="table"></slot>
            </CorePaging>
            <v-spacer class="mt-4" />
          </material-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    color: {
      type: String,
    },
    offset: {
      type: Number,
    },
    fetchData: {
      type: Function,
    },
    fetchCount: {
      type: Function,
    },
    textSearch: {
      type: String,
      default: "Search",
    },
  },
  data: () => ({
    searchInput: null,
    totalPage: null,
    toLoad: 1,
    loaded: 0,
  }),
  computed: {},
  created() {
    this.fetchMain({ page: 1 });
  },
  methods: {
    ...mapMutations("block-loader", ["BL_show", "BL_hide"]),
    onPageChange(page) {
      this.fetchMain({ page: page, search: this.searchInput });
    },
    fetchMainDone() {
      this.loaded++;
      if (this.loaded >= this.toLoad) {
        this.BL_hide();
      }
    },
    fetchMain({ page, search }) {
      this.toLoad = 1;
      this.loaded = 0;

      let param = {
        page: page,
        offset: this.offset,
        search: search,
      };

      this.BL_show();

      if (this.totalPage == null) {
        this.toLoad++;
        this.fetchCount(param).then((data) => {
          this.totalPage = Math.ceil(data / this.offset);
          this.fetchMainDone();
        });
      }
      this.fetchData(param).then((data) => {
        this.fetchMainDone();
      });
    },
    onClickAddButton(e) {},
    onKeypressSearchInput(e) {
      if (e.key == "Enter") {
        this.onClickSearchButton();
      }
    },
    onClickSearchButton() {
      // @SEARCH_FEATURE
      this.totalPage = null;
      if (this.searchInput != null) {
        console.log("start Search", this.searchInput);
        this.fetchMain({ page: 1, search: this.searchInput });
      }
    },
  },
};
</script>

<style>
table.v-table thead tr {
  color: red !important;
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
