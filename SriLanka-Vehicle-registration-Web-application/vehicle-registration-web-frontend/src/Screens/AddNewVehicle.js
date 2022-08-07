import { Component } from "react";
import './css/AddNewVehicle.css';
import 'font-awesome/css/font-awesome.min.css';
import VehicleService from '../Connection/VehicleService';

const initialState = {
    VehicleNumber: '',
    NumberPlateType: '',
    VehicleCategory: '',
    VehicleCompany: '',
    FuelType: '',
    OwnerName: '',
    OwnerAddress: '',

    NumberPlateCorrectFormat: '',
    AlreadyExist: ''
}

class AddNewVehicle extends Component{

    constructor(props){
        super(props)

        this.state = initialState;

        this.BtnSave = this.Saving.bind(this);
        this.BtnVerify = this.Verifying.bind(this);
    }

    handleChangedEvent =(e) =>{
        
        const isCheckBox = e.target.type ==="checkBox";
        this.setState( {
            [e.target.name]: isCheckBox
            ? e.target.checked
            : e.target.value
        })
    }

    BtnBack(){
        this.props.history.push('/home');
    }

    // Number plate Verify... (Modern/ Vintage/ Old)
    Verifying =(e) =>{

        this.setState( {NumberError:"", TypeError:"", CategoryError:"", CompanyError:"", FuelError:"", OwnerNameError: "", OwnerAddressError:""} );
        
        let number_plate_type = "";
        var i = 0;
        e.preventDefault();
        var vehicle_number = this.state.VehicleNumber.toString(); // get user entered plate number...

        var vehicleNum = [];
        this.state.vehicles.map( veh =>( vehicleNum.push((veh.number_plate)))) //get the already exists vehicle-number from DB, and stores as Array...

        //    check 'Old' type number ||      check 'Modern' and 'Vintage' type number plate
        if((vehicle_number.length<=13) && (vehicle_number.length>=7))
        {
            const correct_format = vehicle_number.replace(/[ ]/g, ""); // if number has space, space will remove...

            //      check the 2nd index             &&          check the last 4 index                                                                                      &&    check the first 2 index
            if(  (correct_format.indexOf('ශ්‍රී')===2 ) &&  (!isNaN(correct_format[10]) && !isNaN(correct_format[9]) && !isNaN(correct_format[8]) && !isNaN(correct_format[7])) && (!isNaN(correct_format[0]) && !isNaN(correct_format[1]) ) )
            {
                do
                {
                    if(vehicleNum[i] === correct_format) // check number already exists...
                    {
                        // console.log("This number already exists!");
                        number_plate_type = " ";
                        this.setState( {NumberPlateType: number_plate_type, AlreadyExist : vehicleNum[i]+" - number already exists!" } );
                        break;
                    }
                    else
                    {
                        number_plate_type = "Old";
                        this.setState( {NumberPlateType: number_plate_type, NumberPlateCorrectFormat: correct_format, AlreadyExist : "" } ); 
                    }
                    i++;
                }while(i < vehicleNum.length);
            }   
            //      check the first 3 indexs are 'Numbers'                                            &&  check 3rd index is '-'  &&        check the last 4 index
            else if( ( (!isNaN(correct_format[0]) && !isNaN(correct_format[1]) && !isNaN(correct_format[2])) &&  correct_format[3]==='-' && (!isNaN(correct_format[7]) && !isNaN(correct_format[6]) && !isNaN(correct_format[5]) && !isNaN(correct_format[4])) )// Triple Number Plate - Vintage.
                ||  
                ( (!isNaN(correct_format[0]) && !isNaN(correct_format[1])) &&  correct_format[2]==='-' && (!isNaN(correct_format[6]) && !isNaN(correct_format[5]) && !isNaN(correct_format[4]) && !isNaN(correct_format[3])) )// Two Number Plate - Vintage.  
            ){
                do
                {
                    if(vehicleNum[i] === correct_format) // check number already exists...
                    {
                        // console.log("This number already exists!");
                        number_plate_type = " ";
                        this.setState( {NumberPlateType: number_plate_type, AlreadyExist : vehicleNum[i]+" - number already exists!" } );
                        break;
                    }
                    else
                    {
                        number_plate_type = "Vintage";
                        this.setState( {NumberPlateType: number_plate_type, NumberPlateCorrectFormat: correct_format, AlreadyExist : "" } ); 
                    }
                    i++;
                }while(i < vehicleNum.length);
            }
            //      check the first 3 indexs are 'Alphabet'                                        &&  check 3rd index is '-'   &&  check last 4 index values are mumbers
            else if( ( (isNaN(correct_format[0]) && isNaN(correct_format[1]) && isNaN(correct_format[2])) &&  correct_format[3]==='-'  &&  (!isNaN(correct_format[7]) && !isNaN(correct_format[6]) && !isNaN(correct_format[5]) && !isNaN(correct_format[4])) )// Three Number Plate - Modern.  
                ||
                ( (isNaN(correct_format[0]) && isNaN(correct_format[1])) &&  correct_format[2]==='-'  &&  (!isNaN(correct_format[6]) && !isNaN(correct_format[5]) && !isNaN(correct_format[4]) && !isNaN(correct_format[3])) )// Two Number Plate - Modern.  
            ){
                do
                {
                    if(vehicleNum[i] === correct_format) // check number already exists...
                    {
                        // console.log("This number already exists!");
                        number_plate_type = " ";
                        this.setState( {NumberPlateType: number_plate_type, AlreadyExist : vehicleNum[i]+" - number already exists!"} );
                        break;
                    }
                    else
                    {
                        number_plate_type = "Modern";
                        this.setState( {NumberPlateType: number_plate_type, NumberPlateCorrectFormat: correct_format, AlreadyExist : "" } ); 
                    }
                    i++;
                }while(i < vehicleNum.length);
            }
            else
            {
                number_plate_type = "Invalid Number Plate! Please Enter Valid Number.";
                this.setState( {NumberPlateType: number_plate_type, AlreadyExist : "" } );
            }
        }
        else
        {
            number_plate_type = "Invalid Number Plate! Please Enter Valid Number.";
            this.setState( {NumberPlateType: number_plate_type, AlreadyExist : "" } );
        }  


    }

    // form basic validation...
    Validation =() =>{
        let NumberError = "";
        let TypeError = "";
        let CategoryError = "";
        let CompanyError = "";
        let FuelError = "";
        let OwnerNameError = "";
        let OwnerAddressError = "";
        let isValid = true;

        if(this.state.VehicleNumber==="" || this.state.NumberPlateType==="Please enter the vehicle number!" || this.state.NumberPlateType==="Invalid Number Plate! try again."){
            NumberError = "Enter valid vehicle number!";
        }
        if(!this.state.NumberPlateType==="" || !this.state.NumberPlateType==="Invalid Number Plate! Please Enter Valid Number."){
            TypeError = "Invalid vehicle-number!";
        }
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

        if(NumberError || TypeError || CategoryError || CompanyError || FuelError || OwnerNameError || OwnerAddressError){
            this.setState(
                {NumberError, TypeError, CategoryError, CompanyError, FuelError, OwnerNameError, OwnerAddressError}
            )
            // console.log("error executed: "+isValid);
            return false;
        }
        // console.log("function returned:"+isValid);
        return isValid;
    } 

    //get all vehicle records for checking, if Vehicle-number already exits...
    componentDidMount(){
        VehicleService.getAllVehicle().then(
            (res)=>{
                this.setState( {vehicles: res.data} );
            }
        )
    }

    Saving =(e) =>{
        e.preventDefault();  
        const vehicle_obj = {number_plate: this.state.NumberPlateCorrectFormat, plate_type: this.state.NumberPlateType, vehicle_type: this.state.VehicleCategory, 
                                manufacture_company: this.state.VehicleCompany.toUpperCase(), fuel: this.state.FuelType, owner_name: this.state.OwnerName,
                                owner_address: this.state.OwnerAddress
                            }
        
        //validation...  
        const isValid = this.Validation(); 

        // if you want to see the details through console...                        
        console.log("vehicle details ---> " + JSON.stringify(vehicle_obj)); 

        if(isValid){ 

            if(this.state.NumberPlateType==="Modern" || this.state.NumberPlateType==="Vintage" || this.state.NumberPlateType==="Old")
            {
                this.setState( {NumberError:"", TypeError:"", CategoryError:"", CompanyError:"", FuelError:"", OwnerNameError: "", OwnerAddressError:""} );
                
                let status = VehicleService.addVehicle(vehicle_obj).then( //pass the vehicle details
                    ()=>{
                            if(status){
                                console.log("data successfully added");
                                this.props.history.push("/vehicle/list"); 
                                //clear form
                                this.setState(initialState);
                            }
                    }
                )
            }
            else
            {
                this.setState({  NumberError: "Please Enter the valid number first!"})
            }            
        }

    }


    render(){
        return(
            <section className="AddNewSection bg-light mx-auto"> 

                <form className="container bg-light">
                    <hr className="form-row"/>
                        <h2 className="text-center text-info"><b>Add New Vehicle</b> <i className="fa fa-plus-circle"></i> </h2>
                    <hr className="form-row mb-5"/>

                    <div className="text-danger font-italic text-center">{this.state.AlreadyExist}</div> 

                    <div className="form-row mb-5">
                        <div className="col-md-12">
                            <label>Vehicle Number</label>
                        </div>
                        <div className="col-md-8 mb-3">
                            <input type="text" className="form-control" name="VehicleNumber" placeholder="Enter vehicle number" 
                                value={this.state.VehicleNumber}
                                onChange={this.handleChangedEvent.bind(this)}
                            />
                            <div className="text-danger font-italic">{this.state.NumberError}</div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <button className="btn btn-outline-warning btn-block" name="btnVerify" onClick={this.BtnVerify}> Verify <i className="fa fa-check-circle-o"></i></button>
                        </div>                                         
                    </div>

                    <hr />

                    <div className="form-row mb-5">
                        <div className="col-md-12">
                            <label>Vehicle Type</label>
                        </div>
                        <div className="col-md-12 mb-3">
                            <input type="text" className="form-control text-warning" name="NumberType" placeholder="After clicking on the 'verify' button, the number plate type will be displayed." readOnly
                                value={this.state.NumberPlateType }
                                onChange={this.handleChangedEvent.bind(this)}
                            />
                            <div className="text-danger font-italic">{this.state.TypeError}</div> 
                        </div>                                       
                    </div>

                    <hr />

                    <div className="form-row mb-5">
                        <div className="col-md-6 mb-3">
                            <div >
                                <label>Vehicle Category</label>
                            </div>
                            <div>
                                <select className="form-control col" name="VehicleCategory"
                                    value={this.state.VehicleCategory}
                                    onChange={this.handleChangedEvent.bind(this)}
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
                                    value={this.state.VehicleCompany}
                                    onChange={this.handleChangedEvent.bind(this)}
                                />
                                <div className="text-danger font-italic">{this.state.CompanyError}</div> 
                            </div> 
                        </div>
                    </div>

                    <hr />

                    <div className="form-row mb-5">
                        <div className="col-md-4 mb-3">
                            <div>
                                <label>Fuel Type</label>
                            </div>
                            <div>
                                <select className="form-control" name="FuelType"
                                    value={this.state.FuelType}
                                    onChange={this.handleChangedEvent.bind(this)}
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
                                    onChange={this.handleChangedEvent.bind(this)}
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
                                    onChange={this.handleChangedEvent.bind(this)}
                                />
                                <div className="text-danger font-italic">{this.state.OwnerAddressError}</div> 
                            </div> 
                        </div>         
                    </div>
                    
                    <hr className="form-row mb-5"/> 

                    <div className="form-row">
                        <div className="col-md-4 mb-3 mx-auto">
                            <button className="btn btn-success btn-block" name="btnSave" onClick={this.BtnSave}> Save <i className="fa fa-thumbs-up"></i></button>
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

export default AddNewVehicle;