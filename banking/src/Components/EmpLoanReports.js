import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmpLoanReports = () => {
  const [GetLoanData, SetLoanData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = 'https://localhost:7273/api/managerallloanacc';
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.$values);
      SetLoanData(data.$values);
    } catch (error) {
      console.log(error);
    }
  };


  const styles = {
    homeContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    formBox: {
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      width: '80%',
      marginBottom: '100px',
      marginLeft: '100px',
      marginRight: '100px',
    },
    heading: {
      textShadow: '3px 2px 2px #ecf5fd',
      color: '#333',
      fontSize: '24px',
      fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
    },
    subheading: {
      fontSize: '18px',
      color: '#555',
    },
    label: {
      fontSize: '16px',
      color: '#666',
    },
    button: {
      backgroundColor: 'teal',
      color: '#fff',
      fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
      width: '200px',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
    },
    status: (isActive) => ({
      fontSize: '16px',
      color: isActive ? 'green' : 'red',
    }),
  };

  return (
    <div>
      <div style={styles.homeContainer}>
        <div style={styles.formBox}>
          <h3 style={styles.heading}>Loan Details:</h3>
          {GetLoanData.map((loan, index) => (
            <div key={index}>
              <h2 style={styles.heading}>Loan Amount: ₹{loan.lnamt}</h2>
              <h3 style={styles.subheading}>Balance: ₹{loan.lnbalance}</h3>
              <h4 style={styles.subheading}>Your Loan Account Number: {loan.lnaccid}</h4>
              <label style={styles.label}>Start Date: {loan.startdate}</label><br />
              <label style={styles.label}>Close Date: {loan.closedate}</label><br />
              <label style={styles.label}>Interest Rate: {loan.rateofintrest}%</label><br />
              <label style={styles.label}>Tenure: {loan.tenure} months</label><br />
              <label style={styles.label}>Interest: ₹{loan.intrest}</label><br />
              <label style={styles.label}>EMI: ₹{loan.emi}</label><br />
              <label style={styles.label}>Status: <span style={styles.status(loan.lnstatus)}>{loan.lnstatus ? 'Active' : 'Inactive'}</span></label><br />
              <Link to={`/HomeLoan/LoanTrans?loanid=${loan.lnaccid}`} style={styles.button}>
                Loan Transactions
              </Link>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmpLoanReports;


