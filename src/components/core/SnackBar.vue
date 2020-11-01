<template>
  <div>
    <v-snackbar v-model="SB_state.isShow" :color="SB_state.color">
      {{ SB_state.text }}
      <v-btn dark flat @click="SB_hide"> Close </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { globalComputed, globalMethod } from '../../../helper/app-helper';

export default {
  data: () => ({
    show: true,
  }),
  mounted() {},
  computed: {
    ...globalComputed(),
  },
  methods: {
    ...globalMethod(),
  },
};
</script>
