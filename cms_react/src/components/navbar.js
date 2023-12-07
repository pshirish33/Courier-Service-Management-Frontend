import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
 


  return (
    <nav
      style={{ backgroundColor: '#DAE5E6' }}
      className='navbar navbar-expand-lg navbar-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
         <b>FLASH COURIERS</b> 
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/aboutUs'>
                About Us
              </Link>
            </li>
      
            {/* <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/user/signin'>
                Signin
              </Link>
            </li> */}

            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/trackCourier'>
                Track Courier
              </Link>
            </li>
            
              {sessionStorage.getItem("id")==null?(            
            <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/user/signin'>
                Signin
              </Link>
            </li>):(
            <li className='nav-item ml-sm-2'>
              <Link className='nav-link active' aria-current='page' to='/signout'>
                Sign Out
              </Link>
            </li>)}
             

          </ul>
        </div>
        
      </div>
      
    </nav>
  )
}

export default Navbar



