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
                  ref="username"
                  v-model="username"
                  :rules="[() => !!username || 'This field is required']"
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
import { AppName } from '../../config/app-config';
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data: function () {
    return {
      AppName : AppName,
      DEFAULT_ERROR_MESSAGE: "Incorrect login info",
      username: "",
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
    ...mapMutations("block-loader", ["BL_show", "BL_hide"]),
    ...mapActions("auth", ["login"]),
    loginOnClick: function () {
      this.BL_show();
      let username = this.username;
      let password = this.password;
      this.login({ username, password })
        .then(() => {
          this.BL_hide();
        })
        .catch((err) => {
          this.BL_hide();
          if (err.message) {
            this.errorMessages = err.message;
          }
          this.showSnackbar = true;
        });
    },
  },
  metaInfo() {
    return {
      title: "Super Secret | Login",
    };
  },
};
</script>
