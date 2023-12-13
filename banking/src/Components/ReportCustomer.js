import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ReportCustomer = () => {
  const [customerId, setCustomerId] = useState('');
  const [error, setError] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const cid = useRef('');
  const today = new Date();

  useEffect(() => {
    fetchDataFromUrl();
  }, []);

  useEffect(() => {
    if (customerId) {
      fetchData();
    }
  }, [customerId]);

  const fetchDataFromUrl = () => {
    const qp = new URLSearchParams(window.location.search);
    const customerId = qp.get("c");

    if (customerId) {
      setCustomerId(customerId);
    } else {
      setError("Customer ID not found in the URL");
      setCustomerId(""); // Provide a default value or handle as appropriate
    }
  };




  const fetchData = async () => {
    try {
      const url = `https://localhost:7273/api/custreport/${customerId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setCustomerData(data.$values[0]); // Assuming you expect a single customer with the given ID
      console.log(data.$values[0]);
    } catch (error) {
      setError("Error fetching customer data from the server");
      console.error(error);
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
      width: '100px',
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
      {customerData && (
            <div style={styles.homeContainer}>
            <div style={styles.formBox}>
              <h3 style={styles.heading}>customer Details:</h3>      
                <label style={styles.subheading}>your customer id :{customerData.cid}</label><br/>
                <label style={styles.heading}>account holder's name :{customerData.cFirstname}</label>
                <label style={styles.heading}>&nbsp;{customerData.cLastname}</label><br/>
                <label style={styles.label}>phone number :{customerData.phone}</label><br/>
                <label style={styles.label}>Age :{today.getFullYear() - new Date(customerData.dob).getFullYear()}</label><br/>
                <label style={styles.label}>PAN : {customerData.pan}</label><br/>
                <label style={styles.label}>Salary :{customerData.salary}</label><br/>
                <label style={styles.label}>status : <span style={styles.status(customerData.status)}>{customerData.status? 'active' : 'inactive'}</span></label><br/>
                <label><Link to={`/HomeCustomer/ReportLoan?c=${customerData.cid}`} style={styles.button} >loan</Link></label>
                &nbsp;<label><Link to={`/HomeCustomer/ReportSavings?c=${customerData.cid}`} style={styles.button} >savings</Link></label>
          </div>  
        </div>
      )}
    </div>
  );
};

export default ReportCustomer;
