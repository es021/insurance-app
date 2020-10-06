<template>
  <div>
    <v-dialog v-model="BL_isShow" persistent width="500">
      <v-card light>
        <v-card-text class="py-5 text-xs-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="general"
            indeterminate
          ></v-progress-circular>
          <div class="pt-4">Please wait</div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({}),
  mounted() {},
  computed: {
    ...mapGetters("block-loader", ["BL_isShow"]),
  },
  methods: {
    ...mapMutations("block-loader", ["BL_show", "BL_hide"]),
  },
};
</script>
