import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Switch } from "react-router-dom";
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import AddNewVehicle from './Screens/AddNewVehicle';
import HomePage from './Screens/HomePage';
import VehicleList from './Screens/VehicleList';
import UpdateVehicle from './Screens/UpdateVehicle';
import About from './Screens/About';

function App() {
  return (
    <>
      <Router>
          <Header />
              <Switch>
                  <Route path="/"  exact component={HomePage}></Route>
                  <Route path="/home"  exact component={HomePage}></Route>
                  <Route path="/vehicle/list"  exact component={VehicleList}></Route>
                  <Route path="/vehicle/add"  exact component={AddNewVehicle}></Route>
                  <Route path="/vehicle/update/:id"  exact component={UpdateVehicle}></Route>
                  <Route path="/about"  exact component={About}></Route>
              </Switch>
          <Footer />
      </Router>
    </>
  );
}

export default App;
