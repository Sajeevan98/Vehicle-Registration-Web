import { Component } from "react";


class AddNewVehicle extends Component{
    render(){
        return(
            <div className="container" style={{height:'69vh'}}>
                <table className="table table-striped table-light">
                    <thead>
                        <tr className="table-warning text-danger">
                        <th colSpan="3">Application Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Web Application Name</th>
                            <td colSpan="3">Vehicle Registration of SriLanka</td>
                        </tr>
                        <tr>
                            <th scope="row">Front-end</th>
                            <td colSpan="3" >React.js</td>
                        </tr>
                        <tr>
                            <th scope="row">Back-end</th>
                            <td colSpan="3">Spring boot</td>
                        </tr>
                        <tr>
                            <th scope="row">Database</th>
                            <td colSpan="3">MySQL (phpMyAdmin)</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr className="table-warning text-danger">
                        <th scope="col">Deveop by</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Mobile</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr>
                        <th scope="row">Sajeevan.V</th>
                        <td>sajeevan0541@gmail.com</td>
                        <td>0767930541</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AddNewVehicle;