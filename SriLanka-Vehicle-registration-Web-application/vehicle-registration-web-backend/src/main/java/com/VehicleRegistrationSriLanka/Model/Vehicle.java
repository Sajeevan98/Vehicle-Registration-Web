package com.VehicleRegistrationSriLanka.Model;

import java.util.*;
import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="registered_vehicle")
public class Vehicle {
	
	@Id
	@Column(name="vehicle_number", nullable = false, unique = true)
	private String number_plate;
	
	@Column(name="numper_plate_type" )
	private String plate_type;
	
	@Column(name="vehicle_category", nullable = false)
	private String vehicle_type;
	
	@Column(name="manufacturing_company", nullable = false)
	private String manufacture_company;
	
	@Column(name="fuel_type", nullable = false)
	private String fuel;
	
	@Column(name="owner", nullable = false)
	private String owner_name;
	
	@Column(name="address", nullable = false)
	private String owner_address;
	
	@Column(name = "registration_date", updatable = false)
	@CreationTimestamp
	private Date register_date;

	
	public String getNumber_plate() {
		return number_plate;
	}

	public void setNumber_plate(String number_plate) {
		this.number_plate = number_plate;
	}

	public String getPlate_type() {
		return plate_type;
	}

	public void setPlate_type(String plate_type) {
		this.plate_type = plate_type;
	}

	public String getVehicle_type() {
		return vehicle_type;
	}

	public void setVehicle_type(String vehicle_type) {
		this.vehicle_type = vehicle_type;
	}

	public String getManufacture_company() {
		return manufacture_company;
	}

	public void setManufacture_company(String manufacture_company) {
		this.manufacture_company = manufacture_company;
	}

	public String getFuel() {
		return fuel;
	}

	public void setFuel(String fuel) {
		this.fuel = fuel;
	}

	public String getOwner_name() {
		return owner_name;
	}

	public void setOwner_name(String owner_name) {
		this.owner_name = owner_name;
	}

	public String getOwner_address() {
		return owner_address;
	}

	public void setOwner_address(String owner_address) {
		this.owner_address = owner_address;
	}

	public Date getRegister_date() {
		return register_date;
	}

	public void setRegister_date(Date register_date) {
		this.register_date = register_date;
	}
	

	@Override
	public String toString() {
		return "Vehicle [number_plate=" + number_plate + ", plate_type=" + plate_type + ", vehicle_type=" + vehicle_type
				+ ", manufacture_company=" + manufacture_company + ", fuel=" + fuel + ", owner_name=" + owner_name
				+ ", owner_address=" + owner_address + ", register_date=" + register_date + "]";
	}
	
}
