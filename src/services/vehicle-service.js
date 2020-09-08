import axios from 'axios';
export default class VehicleService {
    constructor() {
        this.API_URL = process.env.VUE_APP_API_URL;
    }
    async getAllVehicle() {
        let result = await axios.get(`${this.API_URL}`);
        // console.log(result.data);
        return result.data;
    }
    async getVehicle(id) {
        let result = await axios.get(`${this.API_URL}/${id}`);
        // console.log(result.data);
        return result.data;
    }
    async addNewVehicle(vehicle) {
        let result = await axios.post(`${this.API_URL}`, vehicle);
        // console.log(result.data);
        return result.data;
    }
    async save(vehicle) {
        let result = await axios.post(`${this.API_URL}`, vehicle);
        // console.log(result.data);
        return result.data;
    }
    async deleteVehicle(id) {
        let result = await axios.delete(`${this.API_URL}/${id}`);
        console.log(result.data);
        return result.data;
    }
    async updateStatus(id, vehicle) {
        let result = await axios.put(`${this.API_URL}/${id}`, vehicle);
        console.log(result.data);
        return result.data;
    }
    async update(id, vehicle) {
        let result = await axios.patch(`${this.API_URL}/${id}`, vehicle);
        console.log(result.data);
        return result.data;
    }
    async postemail(id, file) {
        let result = await axios.post(`${this.API_URL}/${id}`, file);
        console.log(result.data);
        return result.data;
    }
}
//# sourceMappingURL=vehicle-service.js.map