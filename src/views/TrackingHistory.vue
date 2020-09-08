<template>
<MeunbarOut>
  <v-card>
    <v-card-title>
      <v-col cols="6" sm="3">
      <v-toolbar-title>
          <h3>
            <strong>Tracking Event Status</strong>
          </h3>
        </v-toolbar-title>
      </v-col>
      <v-col cols="6" sm="3">
          <v-text-field v-model="search"
           append-icon="search" 
           label="VIN/Shipment Number"
           width="500" hide-details>          
      </v-text-field>
      </v-col>
    </v-card-title>
    <v-data-table :headers="headers" :items="Sno" :search="search" class="elevation-1">
        <template v-slot:[`item.arrivalDate`]="{ item }">
      <span>{{ item.arrivalDate | humanize }}</span>
    </template>
    <template v-slot:[`item.sailDate`]="{ item }">
      <span>{{ item.sailDate | humanize }}</span>
    </template>
    <template v-slot:[`item.acceptedInPort`]="{ item }">
      <span>{{ item.acceptedInPort | humanize }}</span>
    </template>
    <template v-slot:[`item.updatedOn`]="{ item }">
      <span>{{ item.updatedOn | humanize }}</span>
    </template>
    </v-data-table>
  </v-card>  
</MeunbarOut>
</template>

<script>
import axios from "axios";
import HistoryService from "../services/history-service";
import MeunbarOut from "../layouts/MeunbarOut.vue";
const historyService = new HistoryService();
export default {
name: "TrackingHistory",
components: {MeunbarOut},
  data: () => ({  
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
        { text: "Tracking Event", value: "trackingEvent" },
        { text: "Shipment Number", value: "shipmentNo" },
        { text: "Last Update", value: "updatedOn" },
        { text: "Estimated Time of Arrival", value: "arrivalDate" },
        { text: "Sail Date", value: "sailDate" },
        { text: "Port of Sort", value: "portOfSort" },
        { text: "Accepted Date", value: "acceptedInPort" },
      ],
      status: [],
  }),
  computed: {
    Sno() {
      return this.status.map((d, index) => ({ ...d, sno: index + 1 }));
    },
  },
async created() {
    await this.initialize();
  },
  methods: {
    async initialize() {        
      this.status = await historyService.getHistory();
    },
  }
};
</script>

<style scoped>
.v-text-field{
      width: 400px;
}
</style>