<template>
  <form>
    <v-layout wrap>
      <v-flex v-for="d of item" :key="d.key" :class="d.flex">
        <v-textarea
          v-if="d.type == 'textarea'"
          :label="`${d.label} ${d.required ? '*' : ''}`"
          :name="d.key"
          :required="d.required"
          :type="d.type"
          v-model="form[d.key]"
        ></v-textarea>
        <v-text-field
          v-else
          :label="`${d.label} ${d.required ? '*' : ''}`"
          :name="d.key"
          :required="d.required"
          :type="d.type"
          v-model="form[d.key]"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-spacer class="mt-4" />
        <small
          ><i>{{ ps }}</i></small
        >
      </v-flex>
    </v-layout>
  </form>
</template>
<script>
export default {
  props: {
    iconButton: { type: String },
    textButton: { type: String },
    textTitle: { type: String },
    textSave: { type: String, default: "Save" },
    textCancel: { type: String, default: "Cancel" },
    ps: { type: String },
    item: { type: Array },
  },
  data: () => ({
    form: {},
    show: false,
  }),
  mounted() {
    this.$emit("onInit", this.$refs.formElement);
  },
  methods: {
    onClickCancel() {
      this.show = false;
    },
    onClickSubmit() {
      var formElement = this.$refs.formElement;
      var isValid = formElement.reportValidity();
      if (isValid) {
        let data = JSON.parse(JSON.stringify(this.form));
        this.$emit("onSubmit", data);
      }
    },
  },
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