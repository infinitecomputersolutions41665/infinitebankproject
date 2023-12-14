 
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CustomerMaster = () => {
  const [gicid, setGicid] = useState('');
  const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      const qp = new URLSearchParams(window.location.search);
     const  customerId = qp.get('c');
     if (userdata.cid) {
      setGicid(userdata.cid);
      
    } else {
      setError("Customer ID not found in the URL");
    }
  }, []);  

  const userdata = JSON.parse(sessionStorage.getItem("userdata"));
  const styles ={
    div: {
      textShadow: '3px 2px 2px #ecf5fd',
      color: '#333',
      fontSize: '40px',
      fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
      marginLeft:'450px',
   }, homeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  formBox: {
    border: '1px solid #ccc',
    padding: '20px',
    marginTop: '50px',
    marginBottom: '50px',
    borderRadius: '15px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    width: '400px',
  },
  }
    return (
        <div>
            <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
       
      <Link to={`/HomeCustomer?c=${gicid}`} className="navbar-brand">Home</Link>
 
        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div className="navbar-nav">
            {/* <Link to="/HomeSavings" className="nav-item nav-link">Home</Link>         */}
           
            <Link to={`/HomeCustomer/ReportCustomer?c=${gicid}`} className="nav-item nav-link">ReportCustomer</Link>
            
            </div>
        
            <div className="navbar-nav">
            {sessionStorage.getItem("usid")==null?
          <li><Link  className="nav-item nav-link" to="/Login">Login</Link></li>:
          <li><Link  className="nav-item nav-link" to="/Logout">Logout</Link></li>
           }  
            </div>
        </div>
        </div>
        </nav>
            <div>
            {sessionStorage.getItem("usid")==null?
         <div > {navigate('/Login')}</div>:
         <div style={styles.div}>Welcome : {sessionStorage.getItem("usid")} </div>
           }  
            </div>
<div style={{marginTop:"100px", marginLeft:"10px"}}>
<Outlet/>
</div>
</div>
        </div>
    );
};
 
export default CustomerMaster;