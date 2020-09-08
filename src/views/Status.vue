<template>
<MeunbarOut>
  <v-data-table :headers="headers" :items="Sno" :search="search" class="elevation-1">
    <template v-slot:[`item.arrivalDate`]="{ item }">
      <span>{{ item.arrivalDate | humanize }}</span>
    </template>
    <template v-slot:[`item.isPayment`]="{ item }">
      <span v-if="item.isPayment">Paid</span>
      <span v-else>Not-Paid</span>
    </template>
    <template v-slot:[`item.sailDate`]="{ item }">
      <span>{{ item.sailDate | fdate }}</span>
    </template>
    <template v-slot:[`item.acceptedInPort`]="{ item }">
      <span>{{ item.acceptedInPort | fdate }}</span>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>
          <h2>
            <strong>Status of Vehicle</strong>
          </h2>
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>        
          <template>
            <v-btn color="primary" dark class="mb-2" to="/tracking">Tracking History</v-btn>
          </template>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>        
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }} {{ editedItem.id }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.consignee" label="Consignee"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.vin" label="Vehicle Identification Number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.vehicleModel" label="Year/Make/Model"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="items.status" label="Status" v-model="editedItem.status"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      item-text="name"
                      item-value="value"
                      :items="items.isPayment"
                      label="Payment"
                      v-model="editedItem.isPayment"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      v-model="showPicker1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.arrivalDate"
                          label="Estimated Time of Arrival"
                          hint="YYYY/MM/DD"
                          prepend-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.arrivalDate"
                        no-title
                        @input="showPicker1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      v-model="showPicker2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.sailDate"
                          label="Sail Date"
                          hint="YYYY/MM/DD"
                          prepend-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.sailDate"
                        no-title
                        @input="showPicker2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.portOfSort" label="Port of Sail"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.booking" label="Booking"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      v-model="showPicker3"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.acceptedInPort"
                          label="Accepted Date"
                          hint="YYYY/MM/DD"
                          prepend-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem.acceptedInPort"
                        no-title
                        @input="showPicker3 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="E-Mail"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.phone" label="Telephone"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small class="mdi-printer" @click="printInvoice(item)">mdi-arrow-up-bold-box-outline</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</MeunbarOut>
</template>

<script>
import history from "../InterfaceType/IVehicle";
import VehicleService from "../services/vehicle-service";
import MeunbarOut from "../layouts/MeunbarOut.vue";
import axios from "axios";

import { Bus } from "../main.js";
const vehicleService = new VehicleService();

export default {
  name: "Invoice",
  components: {MeunbarOut},
  data: () => ({
    dialog: false,
    search: '',
    headers: [
      {
        text: "S/N",
        align: "start",
        sortable: false,
        value: "sno",
      },
      { text: "Consignee", value: "consignee" },
      { text: "Vehicle Identification Number", value: "vin" },
      { text: "Year/Make/Model", value: "vehicleModel" },
      { text: "Status", value: "status" },
      { text: "Payment", value: "isPayment" },
      { text: "Estimated Time of Arrival", value: "arrivalDate" },
      { text: "Sail Date", value: "sailDate" },
      { text: "Port of Sort", value: "portOfSort" },
      { text: "Booking", value: "booking" },
      { text: "Accepted Date", value: "acceptedInPort" },
      { text: "E-Mail", value: "email" },
      { text: "Telephone", value: "phone" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    showPicker1: false,
    showPicker2: false,
    showPicker3: false,
    status: [],
    editedIndex: -1,
    editedItem: {
      consignee: "",
      vin: 0,
      status: 0,
      isPayment: false,
      arrivalDate: "",
      sailDate: "",
      portOfSort: 0,
      booking: 0,
      acceptedDate: "",
      email: "",
      Telephone: 0,
      updatedOn: new Date().toISOString().substr(0, 10),
    },
    defaultItem: {
      consignee: "",
      vin: "",
      status: "",
      isPayment: false,
      arrivalDate: "",
      sailDate: "",
      portOfSort: 0,
      booking: 0,
      acceptedDate: "",
      email: "",
      Telephone: 0,
      updatedOn: new Date().toISOString().substr(0, 10),
    },

    items: {
      status: [
        "Booked",
        "Cleared Cutoms",
        "Discharged",
        "Loaded On Vessel",
        "On Loaded Order",
        "Permitted to Load",
        "Quay",
        "Yet to Cleared Cutoms", 
      ],
      isPayment: [
        {
          name: "Paid",
          value: true,
        },
        {
          name: "Not-Paid",
          value: false,
        },
      ],
    },
    
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    Sno() {
      return this.status.map((d, index) => ({ ...d, sno: index + 1 }));
    },
    payment() {
      let pay = this.editedItem.isPayment;
      return (this.pay = !pay ? "Not Paid" : "Paid");
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {
    await this.initialize();
  },
  methods: {
    async initialize() {    
      this.status = await vehicleService.getAllVehicle();
    },

    editItem(item) {
      this.editedIndex = this.Sno.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(editedItem) {
      const index = this.Sno.indexOf(editedItem);
      confirm("Are you sure you want to delete this item?") &&
        await vehicleService.deleteVehicle(editedItem.id);
        await this.initialize();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async printInvoice(item) {
      this.editedItem = Object.assign({}, item);
      localStorage.setItem("ItemId", this.editedItem.id);
      let id = this.editedItem.id;      
      confirm("Payment?") &&
      window.history.length > this.$router.push("/invoice/" + id);
      Bus.$emit("printInvoice", this.editedItem);
    },
    async save(editedItem) {
      if (this.editedIndex > -1) {
        // Update Database
        const id = this.editedItem.id;
        const mPaid = this.editedItem.isPayment;
        await vehicleService.updateStatus(id, this.editedItem);
        await this.initialize();
        if (mPaid != true )
        {
          await vehicleService.email(id); // Send Email on Payment made
        }
        // Save update into the HistoryDatabase
       let historyItem = {
          purchasedDate: this.editedItem.purchasedDate,
          vin: this.editedItem.vin,
          updatedOn: new Date().toISOString().substr(0, 10),
          portOfSort: this.editedItem.portOfSort,
          acceptedInPort: this.editedItem.acceptedInPort,
          trackingEvent: this.editedItem.status,
          consignee: this.editedItem.consignee,
          shipmentNo: this.editedItem.booking,
          sailDate: this.editedItem.sailDate,
          arrivalDate: this.editedItem.arrivalDate,
          vehicleModel: this.editedItem.vehicleModel,
        }
        historyItem = JSON.stringify(historyItem);
        await axios
        .post("http://localhost:5000/api/history", historyItem, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        })
      } else {
        // Save to database
        await vehicleService.save(this.editedItem);
        await this.initialize();
      }
      this.close();
    },
  },
};
</script>
