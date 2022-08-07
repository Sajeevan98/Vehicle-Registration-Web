import axios from 'axios';


const Vehicle_Web_API_Base_URL ="http://localhost:8090/vehicle/";

class VehicleService{

    getAllVehicle(){
        return axios.get(Vehicle_Web_API_Base_URL + "all");
    }
    addVehicle(vehicle){
        return axios.post(Vehicle_Web_API_Base_URL + "add", vehicle);
    }
    updateVehicle(vehicle, id){
        return axios.put(Vehicle_Web_API_Base_URL + "update/" + id, vehicle);
    }
    deleteVehicleById(id){
        return axios.delete(Vehicle_Web_API_Base_URL + "delete/" + id);
    }
    getVehicleById(id){
        return axios.get(Vehicle_Web_API_Base_URL + "get/" + id);
    }

}


export default new VehicleService();