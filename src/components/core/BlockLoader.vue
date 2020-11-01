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
import { globalComputed, globalMethod } from "../../../helper/app-helper";

export default {
  data: () => ({}),
  mounted() {},
  computed: {
    ...globalComputed(),
  },
  methods: {
    ...globalMethod(),
  },
};
</script>
