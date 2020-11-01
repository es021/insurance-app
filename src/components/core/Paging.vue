<template>
  <div>
    <div v-if="totalPage > 1 && !hideTop" div class="text-xs-center my-3">
      <v-pagination
        v-model="page"
        :length="totalPage"
        :total-visible="totalVisible"
      ></v-pagination>
    </div>

    <!-- TABLE -->
    <!-- TABLE -->
    <!-- TABLE -->
    <slot></slot>
    <!-- TABLE -->
    <!-- TABLE -->
    <!-- TABLE -->
    <div v-if="totalPage > 1 && !hideBottom" div class="text-xs-center my-3">
      <v-pagination
        v-model="page"
        :length="totalPage"
        :total-visible="totalVisible"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hideTop: {
      type: Boolean,
      default: false,
    },
    hideBottom: {
      type: Boolean,
      default: false,
    },
    totalPage: {
      type: Number,
    },
    totalVisible: {
      type: Number,
      default: 7,
    },
  },
  data: () => ({
    page: 1,
  }),
  watch: {
    page(val) {
      console.log("page", val);
      this.$emit("onPageChange", val);
    },
  },
  computed: {},
  created() {},
  methods: {},
};
</script>

