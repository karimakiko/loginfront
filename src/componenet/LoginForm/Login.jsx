import React from 'react'
import "./login.scss"
import { useState } from 'react'; // Import useState
import axios from 'axios';
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/v1/auth/authenticate', { email, password });
      console.log(response.data); // Log response data
      const token = response.data.token;
      localStorage.setItem('authToken', token);
       // Store the token in local storage
      // Redirect the user to the home page or dashboard
      window.location.href = '/home';
    } catch (error) {
      setError(error.response.data.message); // Set error message from response
    }
  };

  return (
<MDBContainer fluid className="p-3 my-5 h-custom">

<MDBRow>

  <MDBCol col='10' md='6'>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
  </MDBCol>

  <MDBCol col='4' md='6'>

    <div className="d-flex flex-row align-items-center justify-content-center">

      <p className="lead fw-normal mb-0 me-3">Sign in with</p>

      <MDBBtn floating size='md' tag='a' className='me-2'>
        <MDBIcon fab icon='facebook-f' />
      </MDBBtn>

      <MDBBtn floating size='md' tag='a'  className='me-2'>
        <MDBIcon fab icon='twitter' />
      </MDBBtn>

      <MDBBtn floating size='md' tag='a'  className='me-2'>
        <MDBIcon fab icon='linkedin-in' />
      </MDBBtn>

    </div>

    <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">Or</p>
    </div>

    <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(event)=>setEmail(event.target.value)}/>
    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(event)=>setPassword(event.target.value)}/>

    <div className="d-flex justify-content-between mb-4">
      <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
    </div>

    <div className='text-center text-md-start mt-4 pt-2'>
      <MDBBtn className="mb-0 px-5" size='lg' onClick={handleLogin}  >Login</MDBBtn>
      
    </div>

  </MDBCol>

</MDBRow>

<div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

  <div className="text-white mb-3 mb-md-0">
    Copyright © 2024. All rights reserved.
  </div>

  <div>

    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
      <MDBIcon fab icon='facebook-f' size="md"/>
    </MDBBtn>

    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
      <MDBIcon fab icon='twitter' size="md"/>
    </MDBBtn>

    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
      <MDBIcon fab icon='google' size="md"/>
    </MDBBtn>

    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
      <MDBIcon fab icon='linkedin-in' size="md"/>
    </MDBBtn>

  </div>

</div>

</MDBContainer>
  )
}

export default Login