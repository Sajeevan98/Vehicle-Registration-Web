import { Component } from "react";
import VehicleService from "../Connection/VehicleService";
import '../Screens/css/UpdateVehicle.css';

class UpdateVehicle extends Component{

    constructor(props){
        super(props)
        this.state ={
            
            VehicleNumber: this.props.match.params.id, //getting the id(vehicle number) that is clicked to update...
            NumberPlateType: '',
            VehicleCategory: '',
            VehicleCompany: '',
            FuelType: '',
            OwnerName: '',
            OwnerAddress: '',
            RegisteredDate: ''

        }
        this.BtnUpdate = this.Updating.bind(this);
        
    }

    handlePlateType = (e)=> {
        this.setState( {NumberPlateType: e.target.value} )
    }
    handleVehicleCategory = (e)=> {
        this.setState( {VehicleCategory: e.target.value} )
    }
    handleManufactureCompany = (e)=> {
        this.setState( {VehicleCompany: e.target.value})
    }
    handleFueltype = (e)=> {
        this.setState( { FuelType: e.target.value})
    }
    handleOwnerName= (e)=> {
        this.setState( {OwnerName: e.target.value})
    }
    handleOwnerAddress= (e)=> {
        this.setState( {OwnerAddress: e.target.value})
    }
    handleRegisterDate= (e)=> {
        this.setState( {RegisteredDate: e.target.value})
    }

    // retreive data from DB...
    componentDidMount(){
        VehicleService.getVehicleById(this.state.VehicleNumber).then( 
            (res)=>{
                    const vehicle = res.data;
                    this.setState({
                        NumberPlateType : vehicle.plate_type, 
                        VehicleCategory: vehicle.vehicle_type,
                        VehicleCompany: vehicle.manufacture_company,
                        FuelType: vehicle.fuel,
                        OwnerName: vehicle.owner_name,
                        OwnerAddress: vehicle.owner_address,
                        RegisteredDate: vehicle.register_date                       
                    });
            }
        );
    }

    BtnBack(){
        this.props.history.push('/vehicle/list');
    }

    // form basic validation...
    Validation =() =>{

        let CategoryError = "";
        let CompanyError = "";
        let FuelError = "";
        let OwnerNameError = "";
        let OwnerAddressError = "";
        let isValid = true;

        if(!this.state.VehicleCategory){
            CategoryError = "Please select vehicle category!";
        }
        if(!this.state.VehicleCompany){
            CompanyError = "Manufacture company field can not be empty!";
        }
        if(!this.state.FuelType){
            FuelError = "Please select fuel type!";
        }
        if(!this.state.OwnerName){
            OwnerNameError = "Owner name field can not be empty!";
        }
        if(!this.state.OwnerAddress){
            OwnerAddressError = "Owner address field can not be empty!";
        }

        if( CategoryError || CompanyError || FuelError || OwnerNameError || OwnerAddressError){
            this.setState(
                {CategoryError, CompanyError, FuelError, OwnerNameError, OwnerAddressError}
            )
            return false;
        }
        return isValid;
    } 

    Updating = (e)=> {
        e.preventDefault();
        const update_details = { number_plate: this.state.VehicleNumber, plate_type: this.state.NumberPlateType, vehicle_type: this.state.VehicleCategory, 
                                 manufacture_company: this.state.VehicleCompany.toUpperCase(), fuel: this.state.FuelType, owner_name: this.state.OwnerName,
                                 owner_address: this.state.OwnerAddress
                                }

        //validation...  
        const isValid = this.Validation(); 
        // If you want see the update details through console... 
        console.log( 'update vehicle details => '+ JSON.stringify(update_details));

        if(isValid){   
            let status = VehicleService.updateVehicle(update_details, this.state.VehicleNumber).then(
                ()=>{
                    if(status){
                        this.props.history.push('/vehicle/list')
                        console.log( 'data updated successfully!')
                    }
                }
            )        
        }

    }


    render(){
        return(
            <section className="UpdateSection bg-light mx-auto"> 

                <form className="container bg-light">
                    <hr className="form-row"/>
                        <h2 className="text-center text-info"><b>Update Vehicle Records</b> <i className="fa fa-pencil-square-o"></i> </h2>
                    <hr className="form-row mb-5"/>

                    <div className="form-row mb-3">
                        <div className="col-md-4 mb-3">
                            <div>
                                <label>Vehicle Number</label>
                            </div>
                            <div>
                                <input type="text" className="form-control text-warning" name="VehicleNumber" placeholder="Enter vehicle number" 
                                    value={this.state.VehicleNumber}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div>
                                <label>Vehicle Type</label>
                            </div>
                            <div>
                                <input type="text" className="form-control text-warning" name="NumberType" readOnly
                                    value={this.state.NumberPlateType }
                                    onChange={this.handlePlateType.bind(this)}
                                />
                            </div>  
                        </div>  
                        <div className="col-md-5 mb-3">
                            <div>
                                <label>Registered Date</label>
                            </div>
                            <div>
                                <input type="text" className="form-control text-warning" name="NumberType" readOnly
                                    value={this.state.RegisteredDate }
                                    onChange={this.handleRegisterDate.bind(this)}
                                />
                            </div>  
                        </div>           
                    </div>

                    <hr />

                    <div className="form-row mb-3">
                        <div className="col-md-6 mb-3">
                            <div >
                                <label>Vehicle Category</label>
                            </div>
                            <div>
                                <select className="form-control col" name="VehicleCategory"
                                   value={this.state.VehicleCategory }
                                   onChange={this.handleVehicleCategory.bind(this)}
                                >
                                   <option value="">-----select category-----</option>
                                    <option value={"Bike"}>Bike</option>
                                    <option value={"Three Wheeler"}>Three Wheeler</option>
                                    <option value={"Car"}>Car</option>
                                    <option value={"Van"}>Van</option>
                                    <option value={"Jeep"}>Jeep</option>
                                    <option value={"Bus"}>Bus</option>
                                    <option value={"Lorry"}>Lorry</option>
                                </select>
                                <div className="text-danger font-italic">{this.state.CategoryError}</div> 
                            </div>
                            
                        </div>
                        <div className="col-md-6 mb-3">
                            <div>
                                <label>Manufacture Company</label>
                            </div>
                            <div>
                                <input type="text" className="form-control" name="VehicleCompany" placeholder="Enter manufacture company"
                                   value={this.state.VehicleCompany }
                                   onChange={this.handleManufactureCompany.bind(this)}
                                />
                                <div className="text-danger font-italic">{this.state.CompanyError}</div> 
                            </div> 
                        </div>
                    </div>

                    <hr />

                    <div className="form-row mb-3">
                        <div className="col-md-4 mb-3">
                            <div>
                                <label>Fuel Type</label>
                            </div>
                            <div>
                                <select className="form-control" name="FuelType"
                                    value={this.state.FuelType}
                                    onChange={this.handleFueltype.bind(this)}
                                >
                                    <option value="">-----select fuel-----</option>
                                    <option value={"Diesel"}>Diesel</option>
                                    <option value={"Petrol"}>Petrol</option>
                                </select>
                                <div className="text-danger font-italic">{this.state.FuelError}</div> 
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div>
                                <label>Owner Name</label>
                            </div>
                            <div>
                                <input type="text" className="form-control" name="OwnerName" 
                                    value={this.state.OwnerName}
                                    onChange={this.handleOwnerName.bind(this)}
                                />
                                <div className="text-danger font-italic">{this.state.OwnerNameError}</div> 
                            </div> 
                        </div> 
                        <div className="col-md-4 mb-3">
                            <div>
                                <label>Owner Address</label>
                            </div>
                            <div>
                                <input type="text" className="form-control" name="OwnerAddress" 
                                    value={this.state.OwnerAddress}
                                    onChange={this.handleOwnerAddress.bind(this)}
                                />
                                <div className="text-danger font-italic">{this.state.OwnerAddressError}</div> 
                            </div> 
                        </div>         
                    </div>
                    
                    <hr className="form-row mb-5"/> 

                    <div className="form-row">
                        <div className="col-md-4 mb-3 mx-auto">
                            <button className="btn btn-primary btn-block" name="btnSave" onClick={this.BtnUpdate}> Update <i className="fa fa-check-circle-o"></i></button>
                        </div>
                        <div className="col-md-4 mb-3 mx-auto">
                            <button className="btn btn-danger btn-block" name="btnBack" onClick={this.BtnBack.bind(this)}> Back <i className="fa fa-backward"></i></button>
                        </div>
                    </div>
                </form>
            </section>
        )
    }


}

export default UpdateVehicle;