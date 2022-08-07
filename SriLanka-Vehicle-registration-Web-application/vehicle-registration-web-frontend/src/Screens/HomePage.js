import { Component } from "react";
import '../Screens/css/HomePage.css';

class HomePage extends Component {
  render() {
    return (
     <div>
        <section className="sectionFirst" style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/img/02.jpg'})`,
            backgroundRepeat: 'no-repeat' 
            }}>    
            
             <h1 className="text-center font-weight-bold text-light bg-secondary" style={{opacity:'0.7'}}>Welcome to Our Web</h1>
             

        </section>
        <section className="sectionSecound">
            <a href="#home-second-page" className="badge badge-pill badge-light">See more...</a>
        </section>
        <section id="home-second-page" className="sectionThird">
        <h1 className="text-center"><u>Reserved for Home page</u></h1>
            <h4 className="text-center">You can Write any content here...</h4>
        </section>
     </div>
    )
  }
}

export default HomePage;