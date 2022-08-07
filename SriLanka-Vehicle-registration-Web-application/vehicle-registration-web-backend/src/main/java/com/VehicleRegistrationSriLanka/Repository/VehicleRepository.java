package com.VehicleRegistrationSriLanka.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.VehicleRegistrationSriLanka.Model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, String>{

	
}
