import React from "react";
import Navbar from '/components/Navbar';
import { BrowserRouter as Router, Switch,Route} from 
'react-router-dom';
import './App.css';
import Home from './components/pages/Home'
import Services from "./components/pages/Services";
import About from "./components/pages/About";
import SignUp from "./components/pages/SignUp";

function App() {

  return (
  
  <>
     <Router>
       <Navbar/>
       <Switch>
        <Route path='/' exact Component={Home}/>
        <Route path='services' Component={Services}/>
        <Route path='about' Component={About}/>
        <Route path='sign-up' Component={SignUp}/>
       </Switch>
     </Router>
  </>
    );
}
export default App;