<template>
  <MeunbarOut>
    <div id="app">
      <v-app id="inspire">
        <!-- <v-app id="inspire"> -->
        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <!-- <div v-if="!todo.isComplete" class="alert alert-danger">{{result.message}}</div> -->
                <v-card class="elevation-12">
                  <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom></v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-text-field
                        label="Username"
                        v-model="username"
                        :rules="usernameRules"
                        name="username"
                        prepend-icon="mdi-account"
                        type="text"
                      ></v-text-field>

                      <v-text-field
                        id="password"
                        label="Password"
                        v-model="password"
                        :rules="passwordRules"
                        name="password"
                        prepend-icon="mdi-lock"
                        :append-icon="ShowPassWord ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="ShowPassWord ? 'text' : 'password'"
                        @click:append="ShowPassWord = !ShowPassWord"
                      ></v-text-field>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn color="primary" @click="submit" :disabled="!valid">Login</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="danger" to="/">Cancel</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
        <!-- </v-app> -->
      </v-app>
    </div>
  </MeunbarOut>
</template>

<script>
import MeunbarOut from "../layouts/MeunbarOut.vue";
import axios from "axios";
export default {
  name: "Signup",
  components: { MeunbarOut },
  data() {
    return {
      ShowPassWord: false,
      error: "",
      valid: false,
      username: null,
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => (v && v.length <= 10) || "Username must be less than 10",
      ],
      password: null,
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be greater than 6",
      ],
      result: [],
    };
  },

  methods: {
    async submit() {
      let rawData = {
        Username: this.username,
        Password: this.password,
      };
      rawData = JSON.stringify(rawData);
      // var msg = {};
      this.result = await axios
        .post("http://localhost:5000/auth/login", rawData, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        })
        .then((res) => {
          this.result = res.data;
          console.log(this.result);
          localStorage.setItem("LoginResult", this.result);
          localStorage.setItem("Token", this.result.data);

          alert("Successfully Login");
          window.history.length > this.$router.push("/status");
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("LoginResult");
          localStorage.removeItem("Token");
          alert("Wrong login details");
          this.username = "";
          this.password = "";
        });
    },
  },
};
</script>
