import { Component } from "react";

class Header extends Component {
  render() {
    return (   

            <nav className="container-fluid navbar navbar-expand-lg navbar-dark bg-dark ">
                    <div className="col-md-6 mr-5">
                        <a className="navbar-brand text-danger active" href='/home'>
                            <h4>
                                <img src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" width="75" />
                                <i>Sri Lanka Vehicle Registration</i>
                            </h4>
                        </a>
                    </div>
                    <div className="col-md-6 ml-md-5">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto" >
                                <li className="nav-item ml-3">
                                    <a className="nav-link active" aria-current="page" href='/home'>Home</a>
                                </li>
                                <li className="nav-item ml-3">
                                    <a className="nav-link active" href='/vehicle/list'>Registered Vehicle</a>
                                </li>
                                <li className="nav-item ml-3">
                                    <a className="nav-link active" href='/vehicle/add'>Add New</a>
                                </li>
                                <li className="nav-item ml-3">
                                    <a className="nav-link active" href='/about'>About</a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </nav>
    )
  }
}

export default Header;