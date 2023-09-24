import React, { useState,useEffect } from 'react'
import {Link} from'react-router-dom'
import { Button } from './button';
import './Navbar.css';

function Navbar() {
  const[click,setClick] = useState(false);
  const[button, setButton] = useState(true);

  const handleClick = () => setClick(click);
  const closeMobileMenu = () => setClick(false);

  const showButton =() => {
    if(window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() =>{
    showButton();
  }, []);

  window.addEventListener('resize', showButton)
  return (
    <>
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to="/" className="navbar-logo" on click={closeMobileMenu}>
         CVOICE <i className='fab fa-typo3'/>
         </Link>
         <div className='menu-icon' onclick={handleClick}>
          <i className = {click ? 'fas fa-times' : 'fas fa-bars'} />
         </div>
         <ul className={click ? 'nav-menu active' :'nav-menu' }>
          <li className='nav-item'>
            <link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </link>
          </li>
          <li className='nav-item'>
            <link to='/services' className='nav-links' onClick={closeMobileMenu}>
            Services
            </link>
          </li>
          <li className='nav-item'>
            <link to='/about' className='nav-links' onClick={closeMobileMenu}>
              About
            </link>
          </li>
          <li className='nav-item'>
            <link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
              Sign Up
            </link>
          </li>
         </ul>
         {Button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
      </div>
    </nav>
    </>
  )
}

export default Navbar