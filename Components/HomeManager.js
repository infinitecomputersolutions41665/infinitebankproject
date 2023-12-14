import React from 'react';
import { Link } from 'react-router-dom';
 
 
const HomeManager = () => {
    return (
        <div>
           
            <Link to="/HomeManager/AddSavings"   className="nav-item nav-link">AddSavings</Link>            
            <Link to="/HomeManager/DeleteSavings"   className="nav-item nav-link">DeleteSavings</Link>
            <Link to="/HomeManager/AddLoan"   className="nav-item nav-link">AddLoan</Link>
            <Link to="/HomeManager/DeleteLoan"   className="nav-item nav-link">DeleteLoan</Link>
            <Link to="/HomeManager/AddorDelEmp"   className="nav-item nav-link">AddEmp</Link>
            <Link to="/HomeManager/DeleteEmployee"   className="nav-item nav-link">DelEmp</Link>
            <Link to="/HomeManager/ManagerReportsCust"   className="nav-item nav-link">ReportCustomer</Link>

        </div>
    );
};
 
export default HomeManager;