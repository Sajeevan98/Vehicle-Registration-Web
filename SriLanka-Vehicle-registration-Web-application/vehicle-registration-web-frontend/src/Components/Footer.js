import { Component } from 'react'
import './Footer.css';

class Footer extends Component {
  render() {
    return (
        <footer>
            <div className="container-fluid bg-secondary text-center text-light">
                <div className="row">
                    <div className="col-md-12">
                        <span className="foot_link"> <b>&copy;</b> Copy All right Reversed. <a className="text-light text-unstyled" href="#!" target="_blank">@Sajeevan</a></span>
                    </div>
                    <div className="col-md-12">
                        <span className="foot_link"> sajeevan0541@gmail.com</span>
                    </div>
                    <div className="col-md-12">
                        <span className="foot_link"> +94 767930541</span>
                    </div>
                </div>
            </div>
        </footer>
    )
  }
}

export default Footer;