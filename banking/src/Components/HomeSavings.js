
import React from 'react';
import { Link } from 'react-router-dom';
 
const HomeSavings = () => {
    return (
        <div>
            <Link to="/HomeSavings/AddSavings"  className="nav-item nav-link">AddSavings</Link>
            <Link to="/HomeSavings/DeleteSavings"   className="nav-item nav-link">DeleteSavings</Link>
            <Link to="/HomeSavings/EmpSavReports"   className="nav-item nav-link">Reports</Link> 
            <Link to="/HomeSavings/DepositOrWD" className="nav-item nav-link">DepositOrWD</Link> 
        </div>
    );
};
 
export default HomeSavings;