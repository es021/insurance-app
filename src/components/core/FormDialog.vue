<template>
  <v-layout row class="ma-1">
    <v-dialog v-model="show" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn outline color="white" v-on="on">
          <v-icon left dark>{{ iconButton }}</v-icon>
          {{ textButton }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ textTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <CoreForm
              :error="error"
              :data="data"
              :item="item"
              @on-init="onFormInit"
            />
          </v-container>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-spacer />
          <v-btn color="blue darken-1" flat @click="onClickCancel">{{
            textCancel
          }}</v-btn>
          <v-btn color="blue darken-1" @click="onClickSubmit">{{
            textSave
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import * as FormHelper from "../../../helper/form-helper";
export default {
  props: {
    data: { type: Object, default: {} },
    type: { type: String, default: "dialog" },
    iconButton: { type: String },
    textButton: { type: String },
    textTitle: { type: String },
    textSave: { type: String, default: "Save" },
    textCancel: { type: String, default: "Cancel" },
    ps: { type: String },
    item: { type: Array },
    isDone: { type: Boolean, default: false },
  },
  data: () => ({
    formElement: null,
    // formData: {},
    show: false,
    error: null,
  }),
  watch: {
    isDone(val) {
      if (val === true) {
        this.show = false;
      }
    },
  },
  methods: {
    onFormInit(formElement) {
      this.formElement = formElement;
    },
    onClickCancel() {
      this.show = false;
    },
    onClickSubmit() {
      let error = FormHelper.checkError(
        this,
        this.formElement,
        this.item,
        this.data
      );
      if (error) {
        this.error = error;
      } else {
        this.error = null;
        let data = FormHelper.fix(this.item, this.data);
        this.$emit("on-submit", data);
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