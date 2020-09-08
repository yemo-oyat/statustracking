<template>
  <tr>
    <div id="app">
      <v-app id="inspire">
        <h2>
          <p>BUISNESS BLOC INVOICE</p>
        </h2>
        <v-container fluid>
          <td>
            <v-layout row>
              <v-flex xs4>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  label="Roro"
                  type="number"
                  name="roro"
                  v-model="roro"
                  @input="sum"
                  prefix="$"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </td>
          <td>
            <v-layout row>
              <v-flex xs4>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  label="Trucking"
                  type="number"
                  name="truck"
                  v-model="truck"
                  @input="sum"
                  prefix="$"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </td>
          <td>
              <v-layout row>
                <v-flex xs4>
                </v-flex>
                <v-flex xs8>
                  <v-text-field
                    label="Location"
                    type="text"
                    name="loc"
                    v-model="loc"
                    @input="sum"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </td>
          <tr>
            <td>
              <v-layout row>
                <v-flex xs4>
                </v-flex>
                <v-flex xs8>
                  <v-text-field
                    label="Forklift"
                    type="number"
                    name="fork"
                    v-model="fork"
                    @input="sum"
                    prefix="$"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </td>
            <td>
              <v-layout row>
                <v-flex xs4>
                </v-flex>
                <v-flex xs8>
                  <v-text-field
                    label="Miscellaneous"
                    type="number"
                    name="miscell"
                    v-model="miscell"
                    @input="sum"
                    prefix="$"
                    suffix=""
                    length=11
                    precision=2
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </td>
            <td>
              <v-layout row>
                <v-flex xs4>
                </v-flex>
                <v-flex xs8>
                  <v-text-field
                    label="Descprition"
                    type="text"
                    name="desc"
                    v-model="desc"
                    @input="sum"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </td>
          </tr>
          <div class="col-md-12 text-center">
            <strong>Total :  </strong> &nbsp;
            <span class="price-content">{{total_price | price}}</span>
          </div>
          <v-btn color="primary" @click="submit">Generate Invoice</v-btn>
        </v-container>
      </v-app>
    </div>
  </tr>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";

export default {
  name: "TInvoice",
  components: {
  },
  data() {
    return {
      roro: "",
      truck: "",
      loc:"",
      desc:"",
      fork: "",
      miscell: "",
      total_price: 0,
    };
  },

  methods: {
    sum() {
      this.total_price =
        parseFloat(this.roro) +
        parseFloat(this.truck) +
        parseFloat(this.fork) +
        parseFloat(this.miscell);
      if (!isNaN(this.total_price)) {
        return this.total_price;
      } else {
        this.total_price = 0.0;
      }
    },
    submit() {
      let rawData = {
        roro: this.roro,
        truck: this.truck,
        fork: this.fork,
        miscell: this.miscell,
        loc:this.loc,
        desc:this.desc,
        total: this.total_price,
      };
      this.$emit("setParam", rawData);
    },
  },
};
</script>