import { Component } from "react";
import '../Screens/css/VehicleList.css';
import VehicleService from '../Connection/VehicleService';

class VehicleList extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            vehicles : []
        }

        this.BtnUpdate = this.GoToUpdatePage.bind(this);
        this.BtnDelete = this.Deleting.bind(this);
    }

    //go to update page...
    GoToUpdatePage(id){
        this.props.history.push(`/vehicle/update/${id}`);
    }

    //Delete vehicle records...
    Deleting(id){
        if(window.confirm('do you want to delete records of id: '+ id))
        {
            VehicleService.deleteVehicleById(id).then(
                ()=>{
                    this.setState({ vehicles: this.state.vehicles.filter( selectVehicle =>  selectVehicle.number_plate !== id) });
                }
            )
        }
    }

    //get all vehicle records...
    componentDidMount(){
        VehicleService.getAllVehicle().then(
            (res)=>{
                this.setState( {vehicles: res.data} );
            }
        )
    }

    render(){
        return(
                <section className="sectionVehicle" style={{ 
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/img/01.jpg'})`,
                    backgroundRepeat: 'no-repeat'
                    }}> 

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-10 mx-auto" >
                                <table className='table table-responsive overflow-auto table-striped table-bordered'>
                                    <thead>
                                        <tr className="table-primary text-primary text-center" >
                                                <th>Vehicle Number</th>
                                                <th>Vehicle type</th>
                                                <th>Vehicle Category</th>
                                                <th>Manufacture Company</th>
                                                <th>Fuel Type</th>
                                                <th>Owner Name</th>
                                                <th>Owner Address</th>
                                                <th>Registered Date</th>
                                                <th colSpan="2">Action</th>
                                        </tr>
                                    </thead>
                                    {this.state.vehicles.map( veh =>(
                                    <tbody className="table-dark text-white text-center">
                                        <tr key={veh.number_plate}>
                                                <th className="text-warning">{veh.number_plate}</th>
                                                <th>{veh.plate_type}</th>
                                                <th>{veh.vehicle_type}</th>
                                                <th>{veh.manufacture_company}</th> 
                                                <th>{veh.fuel}</th> 
                                                <th>{veh.owner_name}</th> 
                                                <th>{veh.owner_address}</th>
                                                <th>{veh.register_date}</th>  
                                                <th>
                                                    <button className="btn btn-primary btn-sm" onClick={ ()=>this.BtnUpdate(veh.number_plate) }> <b className='mr-2'>Edit</b> <i className="fa fa-pencil"></i></button>
                                                </th>   
                                                <th>
                                                    <button className="btn btn-danger btn-sm" onClick={ ()=>this.BtnDelete(veh.number_plate) }> <b className='mr-2'>delete</b> <i className="fa fa-trash"></i></button>
                                                </th> 
                                        </tr>
                                    </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
}

export default VehicleList;