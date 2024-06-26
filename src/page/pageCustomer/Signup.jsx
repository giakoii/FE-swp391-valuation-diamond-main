  import React, { useState } from 'react'
  import { NavLink } from "react-router-dom";
  function Signup(){
    const [formState,setForm] =useState({
      firstname:'',
      lastname:'',
      username:'',
      password:'',
    });
    const handleOnChange = (event) => {
      setForm({
        ...formState,
        [event.target.name]:event.target.value,
      });
    
    }

    const handleOnSubmit = async (event) =>{
      event.preventDefault();
      try {
        const response = await fetch('', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState),
        });

        if (response.ok) {
          // Handle successful response (e.g., show success message)
        } else {
          // Handle error response (e.g., show error message)
        }
      } catch (error) {
        // Handle network errors (e.g., show error message)
      }
    };

    return (
      <div className="form-container d-flex justify-content-center align-items-center">
        <form
                  className="form-row my-5 p-5" 
                  style={{ width: "600px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
                  onSubmit={handleOnSubmit}
          >
            <div className="form-title d-flex justify-content-center mb-3 fw-bold">
                      <h1>Sign Up</h1>
            </div>
            <div className="form-row d-flex justify-content-between">
            <div className="form-group mt-4">
              <label htmlFor="firstname" className='px-2' style={{ display: "block" }}>First Name : </label>
              <input 
                id="firstname"
                type="text"
            
                name="firstname"
                value={formState.firstname}
                className="form-control mt-1 px-2"
                style={{ width: "200px", height: "37px" }}
                onChange={handleOnChange} 
              required
              
              />
              </div>
              <div className="form-group mt-4">
              <label htmlFor="lastname" className='px-2' style={{ display: "block" }}>Last Name : </label>
              <input 
                id="lastname"
                type="text"
            
                name="lastname"
                value={formState.lastname}
                className="form-control mt-1 px-2"
                style={{ width: "200px", height: "37px" }}
                onChange={handleOnChange} 
              required
              
              />
            
              
              
              
            </div>
            </div>
            <div className="form-group mt-4">
                    <label htmlFor="username" className='px-2'> Username :</label>
                    <input
                        id="email"
                        type="text"
                        placeholder=" Enter username"
                        name="username"
                        value={formState.username}
                        className="form-control mt-1 px-2"
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="form-group mt-3 ">
                    <div className="form-password d-flex justify-content-between">
                        <label htmlFor="password" className='px-2'>Password</label>
                    </div>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formState.password}
                        className="form-control mt-1 py-2"
                        onChange={handleOnChange}
                        required
                    />
                </div>  
            <div className="form-button d-grid mt-4 text-center">
                      <button type="submit" className="btn fw-bold py-2" style={{ backgroundColor: "#CCFBF0" }}>
                          Create Account
                      </button>
                  </div>

                  <div className="d-flex align-items-center mt-4">
                      <div style={{ flex: 1, backgroundColor: "#DDE1DF", height: "2px" }} />
                      <p style={{ margin: "0 10px" }}>Or sign in with</p>
                      <div style={{ flex: 1, backgroundColor: "#DDE1DF", height: "2px" }} />
                  </div>

                  <div className="form-img text-center mt-4"
                      onClick={(e) => {
                          
                      }}>
                      <img
                          src="/src/assets/Google.png"
                          alt="google"
                          className="img rounded-circle border border-dark"
                          height="40"
                          width="40"
                      />
                  </div>
                  <hr
                      style={{
                          background: "#DDE1DF",
                          height: "2px",
                          marginTop: "1.5em"
                      }}
                  />
                  <p className="text-center mt-4">already have account !!!!! <NavLink to="/login" className ="link-secondary">Login</NavLink></p>
            

        </form>
      </div>
    );
  }
  export default Signup;
