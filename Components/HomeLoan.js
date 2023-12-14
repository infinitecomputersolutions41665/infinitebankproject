
import React from 'react';
import { Link } from 'react-router-dom';
 
const HomeLoan = () => {
    return (
        <div>
            <Link to="/HomeLoan/AddLoan"   className="nav-item nav-link">AddLoan</Link>
            <Link to="/HomeLoan/DeleteLoan"   className="nav-item nav-link">DeleteLoan</Link>
            <Link to="/HomeLoan/EmpLoanReports"   className="nav-item nav-link">Reports</Link>  
           
        </div>
    );
};
export default HomeLoan;
 