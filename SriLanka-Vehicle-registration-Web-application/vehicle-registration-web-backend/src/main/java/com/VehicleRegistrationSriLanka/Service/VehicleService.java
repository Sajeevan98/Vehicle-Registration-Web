package com.VehicleRegistrationSriLanka.Service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import com.VehicleRegistrationSriLanka.Model.Vehicle;

public interface VehicleService {

	public List<Vehicle> findAllVehicle();
	public ResponseEntity<Vehicle> findByVehicleId(String Id);
	public Vehicle saveVehicle(Vehicle vehicle);
	public ResponseEntity<Vehicle> updateByVehicleId(String Id, Vehicle vehicle);
	public ResponseEntity<Map<String, Boolean>> deleteByVehicleId(String Id);
}
