export default interface IVehicle {
  id: number;
  purchasedDate: Date;
  vin: string;
  updatedOn: Date;
  portOfSort: string;
  phone: number;
  acceptedInPort: Date;
  isPayment: boolean;
  status: string;
  consignee: string;
  booking: string;
  sailDate: Date;
  arrivalDate: Date;
  vehicleModel: string;
  email: string;
}

export default interface invoice {
  roro: 0;
  truck: 0;
  fork: 0;
  miscell: 0;
  loc:"";
  desc:"";
  total: 0;
}

export default interface history {
  id: number;
  purchasedDate: Date;
  vin: string;
  updatedOn: Date;
  portOfSort: string;
  acceptedInPort: Date;
  trackingEvent: string;
  consignee: string;
  shipmentNo: string;
  sailDate: Date;
  arrivalDate: Date;
  vehicleModel: string;
}
