<template>
  <meunbar>
    <div id="app" class="flex-container wrap">
      <div class="flex-item">
        <tbl @setParam="Onset"></tbl>
      </div>
      <div class="flex-item">
        <v-btn color="primary" @click="submit" :disabled="!set.total"
          >Send E-Mail</v-btn
        >
        <div class="invoice-box" id="invoice" ref="invoice">
          <h3>BUISNESSBLOC INVOICE</h3>
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="4">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="title">
                      <img
                        alt="Vue logo"
                        src="../assets/vtlogo.png"
                        style="width:50%; max-width:250px;"
                      />
                    </td>
                    <td>
                      <strong>Consignee :</strong>
                      {{ item.consignee }}
                      <br />
                      <strong>Status :</strong>
                      {{ item.status }}
                      <br />
                      <strong>Date:</strong>
                      {{ Date() | humanize }}
                    </td>
                  </tr>
                </table>

                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <strong>Port of sail :</strong>
                      {{ item.portOfSort }}
                      <br />
                      <strong>E.T.A :</strong>
                      {{ item.arrivalDate | humanize }}
                      <br />
                    </td>

                    <td>
                      <strong>VIN :</strong>
                      {{ item.vin }}
                      <br />
                      <strong>Year/Make/Model :</strong>
                      {{ item.vehicleModel }}
                      <br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr class="heading">
              <td colspan="2">Shipping Fee</td>
              <td>Price ($)</td>
              <td></td>
            </tr>
            <tr class="details">
              <td colspan="2">Roro</td>
              <td>{{ parseFloat(set.roro) | curr }}</td>
            </tr>
            <tr class="details">
              <td colspan="2">Trucking ({{set.loc}})</td>
              <td>{{ parseFloat(set.truck) | curr }}</td>
            </tr>
            <tr class="details">
              <td colspan="2">Non Run/Forklift</td>
              <td>{{ parseFloat(set.fork) | curr }}</td>
            </tr>
            <tr class="details">
              <td colspan="2">Miscellaneous ({{(set.desc)}})</td>
              <td>{{ parseFloat(set.miscell) | curr }}</td>
            </tr>
            <tr class="details">
              <td colspan="2"></td>
              <td>
                <strong>Total :</strong>
                &nbsp;&nbsp;
                {{ parseFloat(set.total) | curr }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </meunbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IVehicle from '../InterfaceType/IVehicle';
import invoice from '../InterfaceType/IVehicle';
import VehicleService from '../services/vehicle-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CanvasElementContainer } from 'html2canvas/dist/types/dom/replaced-elements/canvas-element-container';

import Meunbar from '../layouts/Meunbar.vue';
import { Bus } from '../main.js';
import tbl from '../components/TInvoice.vue';
import Sta from '../views/Status.vue';

const vehicleService = new VehicleService();

@Component({
  name: 'Invoice',
  components: { Meunbar, tbl, Sta },
})
export default class item extends Vue {
  item: IVehicle[] = [];

  set: invoice[] = [];

  async getVehicle() {
    let id = <IVehicle><unknown>parseInt(this.$route.params.id);
    await vehicleService.getVehicle(id).then((res) => (this.item = res));
  }

  downloadPdf() {
    let pdf = new jsPDF('p', 'pt', 'A4', true);
    let invoice = document.getElementById('invoice') as HTMLCanvasElement;

    html2canvas(invoice).then((canvas) => {
      let image = canvas.toDataURL('image/png');
      pdf.addImage(image, 'PNG', 100, 70, 700 * 0.55, 700 * 0.55);
      let id = parseInt(this.$route.params.id);
      var file = pdf.output('blob');
      return pdf.save('invoice');
    });
  }

  async created() {
    await this.getVehicle();
  }

  async submit() {
    let id = parseInt(this.$route.params.id);
    let pdf = new jsPDF('p', 'pt', 'A4', true);
    let invoice = document.getElementById('invoice') as HTMLCanvasElement;

    await html2canvas(invoice).then((canvas) => {
      let image = canvas.toDataURL('image/png');
      pdf.addImage(image, 'PNG', 100, 70, 700 * 0.55, 700 * 0.55);
      var file = pdf.output('blob');
      vehicleService.postemail(id, file);
      this.downloadPdf();
    });
    alert('E-mail Sent!');
  }
  async Onset(rawData) {
    this.set = rawData;
    console.log(rawData);
  }
}
</script>

<style lang="scss">
.flex-container {
  padding: 20;
  margin: 10;
  list-style: none;
  border: 1px solid silver;
  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
}
.flex-item {
  // background: tomato;
  padding: 60px;
  margin: 10px;

  line-height: 100px;
  color: white;
  //   font-weight: bold;
  //   font-size: 2em;
  text-align: center;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 2px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  line-height: 24px;
  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 10px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(n + 2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 10px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 10px;
}

.invoice-box table tr.heading td {
  background: #cc4c;
  border-bottom: 1px solid #ff5eff;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 2px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.item input {
  padding-left: 5px;
}

.invoice-box table tr.item td:first-child input {
  margin-left: -5px;
  width: 100%;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

.invoice-box input[type='number'] {
  width: 60px;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial,
    sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}
</style>
