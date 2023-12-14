
import React from 'react';
import { Outlet, Link } from "react-router-dom";
const ManagerMaster = () => {        
  const styles ={
    div: {
      textShadow: '3px 2px 2px #ecf5fd',
      color: '#333',
      fontSize: '40px',
      fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
      marginLeft:'200px',
      
   }, 
   homeContainer: {
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
        <div sytle = {{marginLeft:'100px'}}>
            <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link to="/HomeManager" className="navbar-brand">Home</Link>
     
        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div className="navbar-nav">
 
            <Link to="/HomeManager/AddSavings"   className="nav-item nav-link">AddSavings</Link>            
            <Link to="/HomeManager/DeleteSavings"   className="nav-item nav-link">DeleteSavings</Link>
            <Link to="/HomeManager/AddLoan"   className="nav-item nav-link">AddLoan</Link>
            <Link to="/HomeManager/DeleteLoan"   className="nav-item nav-link">DeleteLoan</Link>
            <Link to="/HomeManager/AddorDelEmp"   className="nav-item nav-link">AddEmp</Link>
            <Link to="/HomeManager/DeleteEmployee"   className="nav-item nav-link">DelEmp</Link>
            <Link to="/HomeManager/ManagerReportsCust"   className="nav-item nav-link">ReportCustomer</Link>
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
<div style={{marginTop:"100px", marginLeft:"150px"}}>
{sessionStorage.getItem("usid")==null?
         <div >Welcome Guest</div>:
         <div style={styles.div}>Welcome : {sessionStorage.getItem("usid") }</div>
           }  
<Outlet/>
</div>
</div>
 
 
</div>
    );
};
 
export default ManagerMaster;
 
 
 