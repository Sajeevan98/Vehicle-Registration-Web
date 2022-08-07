package com.VehicleRegistrationSriLanka.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.VehicleRegistrationSriLanka.Exception.ResourceNotFoundException;
import com.VehicleRegistrationSriLanka.Model.Vehicle;
import com.VehicleRegistrationSriLanka.Repository.VehicleRepository;

@Service
public class VehicleServiceImplementation implements VehicleService{

	@Autowired
	private VehicleRepository vRepository;
	
	@Override
	public List<Vehicle> findAllVehicle() {
		
		return vRepository.findAll();
	}

	@Override
	public ResponseEntity<Vehicle> findByVehicleId(String Id) {
		Vehicle vehicle_number = vRepository.findById(Id).orElseThrow(
				() -> new ResourceNotFoundException("Vehicle not exit with Id: "+ Id)
		);
		
		return ResponseEntity.ok(vehicle_number);
	}

	@Override
	public Vehicle saveVehicle(Vehicle vehicle) {
		
		return vRepository.save(vehicle);
	}

	@Override
	public ResponseEntity<Vehicle> updateByVehicleId(String Id, Vehicle vehicle) {
		Vehicle vehicle_number = vRepository.findById(Id).orElseThrow(
				() -> new ResourceNotFoundException("Vehicle not exit with Id: "+ Id)
		);
		
		vehicle_number.setNumber_plate(vehicle.getNumber_plate());
		vehicle_number.setPlate_type(vehicle.getPlate_type());
		vehicle_number.setVehicle_type(vehicle.getVehicle_type());
		vehicle_number.setManufacture_company(vehicle.getManufacture_company());
		vehicle_number.setFuel(vehicle.getFuel());
		vehicle_number.setOwner_name(vehicle.getOwner_name());
		vehicle_number.setOwner_address(vehicle.getOwner_address());
		vehicle_number.setOwner_address(vehicle.getOwner_address());
		
		Vehicle updateVehicle = vRepository.save(vehicle_number); 
		return ResponseEntity.ok(updateVehicle);
	}

	@Override
	public ResponseEntity<Map<String, Boolean>> deleteByVehicleId(String Id) {
		Vehicle vehicle_number = vRepository.findById(Id).orElseThrow(
				() -> new ResourceNotFoundException("Vehicle not exit with Id: "+ Id)
		);
		
		vRepository.delete(vehicle_number);
		
		Map<String,Boolean> response = new HashMap<>();
		response.put("Records deleted: ", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	
	
	

}
