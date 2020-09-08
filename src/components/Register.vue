<template>
  <Meunbar>
    <div id="app">
      <v-app id="inspire">
        <!-- <v-app id="inspire"> -->
        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12" ref="form">
                  <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Register form</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom></v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        ref="name"
                        label="Full Name"
                        name="name"
                        v-model="name"
                        :rules="nameRules"
                        prepend-icon="mdi-account"
                        type="text"
                        required
                      ></v-text-field>
                      <v-text-field
                        ref="username"
                        id="username"
                        label="Username"
                        name="username"
                        v-model="username"
                        :counter="10"
                        :rules="usernameRules"
                        prepend-icon="mdi-account"
                        type="text"
                        required
                      ></v-text-field>

                      <v-text-field
                        ref="password"
                        id="password"
                        label="Password"
                        name="password"
                        v-model="password"
                        :counter="0"
                        :rules="passwordRules"
                        prepend-icon="mdi-lock"
                        :append-icon="ShowPassWord ? 'mdi-eye' : 'mdi-eye-off' "
                        :type="ShowPassWord ? 'text' : 'password'"
                        @click:append="ShowPassWord =!ShowPassWord"
                        required
                      ></v-text-field>
                      <!-- <div v-if="error" class="alert alert-danger">{{error}}</div> -->
                    </v-form>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn color="primary" class="mr-4" @click="onSubmit">Register</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="danger" to="/">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
        <!-- </v-app> -->
      </v-app>
    </div>
  </Meunbar>
</template>

<script >
import Meunbar from "../layouts/Meunbar.vue";
import IAuth from "@/InterfaceType/IAuth";
import VehicleService from "../services/vehicle-service";
import axios from "axios";

export default {
  name: "RegisterUser",
  components: { Meunbar },
  data() {
    return {
      ShowPassWord: false,
      formHasErrors: false,
      valid: true,
      name: null,
      nameRules: [(v) => !!v || "Full Name is required"],
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
      errorMessages: "",
    };
  },

  computed: {
    form() {
      return {
        name: this.name,
        Username: this.username,
        Password: this.password,
      };
    },
  },

  watch: {
    name() {
      this.errorMessages = "";
    },
  },
  methods: {
    async onSubmit() {
      // const formData = new FormData();
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });

      let rawData = {
        Name: this.name,
        Username: this.username,
        Password: this.password,
      };
      rawData = JSON.stringify(rawData);
      await axios
        .post("http://localhost:5000/auth/register", rawData, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        })
        .then((res) => {
          console.log(res);
        });
      alert("User Successfully Added");

      this.name = "";
      this.username = "";
      this.password = "";
    },
  },
};
</script>
    