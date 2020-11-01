<template>
  <v-content>
    <v-container fill-height fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12 mt-5">
            <v-toolbar color="general">
              <v-toolbar-title class="white--text"
                >Welcome to {{ AppName }}</v-toolbar-title
              >
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  ref="email"
                  v-model="email"
                  :rules="[() => !!email || 'This field is required']"
                  prepend-icon="mdi-account"
                  label="Email"
                  placeholder="john.doe@gmail.com"
                  required
                />
                <v-text-field
                  ref="password"
                  v-model="password"
                  :rules="[() => !!password || 'This field is required']"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-icon="mdi-lock"
                  label="Password"
                  placeholder="*********"
                  counter
                  required
                  @keydown.enter="login"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
            </v-card-text>
            <v-divider class="mt-5" />
            <v-card-actions>
              <v-spacer />
              <v-btn
                align-center
                justify-center
                color="general"
                @click="loginOnClick"
                >Login
              </v-btn>
            </v-card-actions>
            <v-snackbar v-model="showSnackbar" color="error">
              {{ errorMessages }}
              <v-btn dark flat @click="showSnackbar = false"> Close </v-btn>
            </v-snackbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { AppName } from "../../config/app-config";
import { globalMethod, windowTitle } from "../../helper/app-helper";
import AuthHelper from '../../helper/auth-helper';

export default {
  data: function () {
    return {
      AppName: AppName,
      DEFAULT_ERROR_MESSAGE: "Incorrect login info",
      email: "",
      password: "",
      errorMessages: "",
      showSnackbar: false,
      showPassword: false,
    };
  },
  mounted() {
    this.errorMessages = this.DEFAULT_ERROR_MESSAGE;
  },
  methods: {
    ...globalMethod(),
    loginOnClick() {
      this.BL_show();
      let email = this.email;
      let password = this.password;
      AuthHelper.login({ email, password })
        .then((data) => {
          this.BL_hide();
          console.log(data);
        })
        .catch((err) => {
          this.BL_hide();
          this.errorMessages = err;
          this.showSnackbar = true;
        });
    },
  },
};
</script>
