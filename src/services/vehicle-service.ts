import axios from 'axios';
import IVehicle from '@/InterfaceType/IVehicle';

export default class VehicleService {
  API_URL = process.env.VUE_APP_API_URL;
  token = localStorage.getItem('Token');

  public async getAllVehicle(): Promise<IVehicle[]> {
    let result = await axios.get(`${this.API_URL}/inventory/`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });    
    localStorage.removeItem("Token");
    return result.data;
  }

  public async getVehicle(id: IVehicle): Promise<IVehicle[]> {
    let result = await axios.get(`${this.API_URL}/inventory/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    // console.log(result.data);
    return result.data;
  }

  public async addNewVehicle(vehicle: IVehicle) {
    let result = await axios.post(`${this.API_URL}/inventory`, vehicle, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    // console.log(result.data);
    return result.data;
  }
  public async addUser(formData) {
    let result = await axios.post(`${this.API_URL}/inventory`, formData);
    // console.log(result.data);
    return result.data;
  }
  public async save(vehicle: IVehicle) {
    let result = await axios.post(`${this.API_URL}/inventory`, vehicle, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    // console.log(result.data);
    return result.data;
  }

  public async deleteVehicle(id: IVehicle) {
    let result = await axios.delete(`${this.API_URL}/inventory/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    // console.log(result.data);
    return result.data;
  }

  public async updateStatus(id: IVehicle, vehicle: IVehicle) {
    let result = await axios.put(`${this.API_URL}/inventory/${id}`, vehicle, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    // console.log(result.data);
    return result.data;
  }

  public async update(id: IVehicle, vehicle: IVehicle) {
    let result = await axios.patch(`${this.API_URL}/inventory/${id}`, vehicle, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    // console.log(result.data);
    return result.data;
  }

  public async email(id) {
    const formData = new FormData();
    var request = new XMLHttpRequest();
    request.open(`POST`, `${this.API_URL}/inventory/${id}`);
    request.send(formData);
    // console.log(request.response);
  }

  public async postemail(id, file) {
    // let result = await axios.post(`${this.API_URL}/${id}`,file);
    const formData = new FormData();
    formData.append('pdf', file, 'Invoice');
    // formData.append("id", id);
    var request = new XMLHttpRequest();
    request.open(`POST`, `${this.API_URL}/inventory/${id}`, file);
    request.send(formData);
    // console.log(request.response);
  }
}
