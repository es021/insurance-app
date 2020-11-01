<template>
  <form ref="formElement">
    <!-- @keyup="$emit('on-update', d.key, form[d.key])" -->

    <v-layout wrap>
      <v-flex v-for="d of item" :key="d.key" :class="d.flex">
        <v-textarea
          v-if="d.type == 'textarea'"
          :label="`${d.label} ${d.required ? '*' : ''}`"
          :name="d.key"
          :disabled="d.disabled"
          :required="d.required"
          :type="d.type"
          :hint="d.hint"
          persistent-hint
          v-model="data[d.key]"
        ></v-textarea>
        <v-select
          v-if="d.type == 'select'"
          :items="d.items"
          :name="d.key"
          :disabled="d.disabled"
          v-model="data[d.key]"
          :required="d.required"
          :hint="d.hint"
          persistent-hint
          :label="`${d.label} ${d.required ? '*' : ''}`"
        ></v-select>
        <v-text-field
          v-else
          :disabled="d.disabled"
          :label="`${d.label} ${d.required ? '*' : ''}`"
          :name="d.key"
          persistent-hint
          :required="d.required"
          :type="d.type"
          :hint="d.hint"
          v-model="data[d.key]"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-spacer class="mt-4" />
        <small
          ><i>{{ ps }}</i></small
        >
      </v-flex>
      <v-flex v-if="error" xs12>
        <v-alert :value="true" type="error"
          ><span v-html="error"></span
        ></v-alert>
      </v-flex>
    </v-layout>
  </form>
</template>
<script>
export default {
  props: {
    data: { type: Object },
    ps: { type: String },
    error: { type: String },
    item: { type: Array },
  },
  data: () => ({}),
  mounted() {
    this.$emit("on-init", this.$refs.formElement);
  },
  methods: {},
};
</script>



              <!-- <v-flex xs12 sm6>
                <v-text-field
                  label="First Name *"
                  name="first_name"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Last Name *"
                  name="first_name"
                  required
                ></v-text-field>
              </v-flex> -->
              <!-- <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex> -->
              <!-- <v-flex xs12 sm6>
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump',
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-flex>


               -->