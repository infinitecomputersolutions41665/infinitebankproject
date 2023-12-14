
import React from 'react';
import { Outlet, Link } from "react-router-dom"; 
const LoanMaster = () => {
               
   
           
           
    return (
        <div sytle = {{marginLeft:'100px'}}>
 
            <div>
 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
       
      <Link to="/" className="navbar-brand">Home</Link>
     
        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
           
   
            <div className="navbar-nav">
 
            {sessionStorage.getItem("uid")==null?
          <li><Link  className="nav-item nav-link" to="/Login">Login</Link></li>:
          <li><Link  className="nav-item nav-link" to="/Logout">Logout</Link></li>
           }  
 
            </div>
        </div>
        {sessionStorage.getItem("uid")==null?
         <div className='btn btn-info'>Welcome Guest</div>:
         <div  className='btn btn-success'>Welcome : {sessionStorage.getItem("uid") }</div>
           }  
    </div>
 
</nav>
<div style={{marginTop:"100px", marginLeft:"150px"}}>
<Outlet/>
</div>
</div>
 
 
</div>
    );
};
 
export default LoanMaster;
 
 
 