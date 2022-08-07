package com.VehicleRegistrationSriLanka.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.VehicleRegistrationSriLanka.Model.Vehicle;
import com.VehicleRegistrationSriLanka.Service.VehicleService;

@RestController
@CrossOrigin
@RequestMapping(value = { "/", "/home" } )
public class VehicleController {

	@Autowired
	private VehicleService vService;
	
	// get all vehicle details...
	@GetMapping("/vehicle/all")
	public List<Vehicle> getAll(){
		
		return vService.findAllVehicle();
	}
	
	// get a specific vehicle-details by id...
	@GetMapping("/vehicle/get/{id}")
	public ResponseEntity<Vehicle> getById(@PathVariable String id){
		
		return vService.findByVehicleId(id);
	}
	
	// save vehicle-details...
	@PostMapping("/vehicle/add")
	public String addVehicle(@RequestBody Vehicle vehicle) {
				
		vService.saveVehicle(vehicle);
		return "Vehicle added successfully!";
	}
	
	// update vehicle-details by id...
	@PutMapping("/vehicle/update/{id}")
	public ResponseEntity<Vehicle> updateVehicle(@PathVariable String id, @RequestBody Vehicle vehicle ) {
		
		return vService.updateByVehicleId(id, vehicle);		
	}
	
	// delete vehicle-details by id...
	@DeleteMapping("/vehicle/delete/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteVehicle(@PathVariable String id){
		
		return vService.deleteByVehicleId(id);		
	}
}
