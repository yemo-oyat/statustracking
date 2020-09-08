import axios from 'axios';
import history from '@/InterfaceType/IVehicle';

export default class VehicleService {
  API_URL = process.env.VUE_APP_API_URL;
  //   token = localStorage.getItem('Token');

  public async getHistory(): Promise<history[]> {
    let result = await axios.get(`${this.API_URL}/history`);
    // console.log(result.data);
    return result.data;
  }

  public async add(item: history) {
    let result = await axios.post(`${this.API_URL}/history`, item);
    // console.log(result.data);
    return result.data;
  }
}
