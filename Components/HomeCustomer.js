import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomeCustomer = () => {
  const [gicid, setGicid] = useState('');
  const [getamountdata, setAmountData] = useState([]);
  const [getLoandata, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingl,setloadingl] = useState(true);
  const [error, setError] = useState(null);
  const [errorl, setErrorl] = useState(null);
  // const userdata = JSON.parse(sessionStorage.getItem("userdata")); 

  useEffect(() => {
    const qp = new URLSearchParams(window.location.search);
   const  customerId = qp.get('c');

    if (customerId) {
      setGicid(customerId);
      fetchData(customerId);
      loanData(customerId);

    } else {
      setError("Customer ID not found in the URL");
    }
  }, []);

  const fetchData = async (customerId) => {
    console.log(customerId);
    const url = `https://localhost:7273/api/custamnt/${customerId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setAmountData(data);
    } catch (error) {
      setError("Error fetching data from the server");
    } finally {
      setLoading(false);
    }
  };
   const loanData = async (customerId)=>{
    const url = `https://localhost:7273/api/loanamnt/${customerId}`;
    try{
      const response = await fetch(url)
      const data =await response.json();
      console.log(data)
      setLoanData(data);
    } catch(error){
      setErrorl("Error fetching data from the server");
    }finally {
      setloadingl(false);
    }
   }



  const styles ={
    h2: {
      textShadow: '3px 2px 2px #ecf5fd',
      color: '#333',
      fontSize: '45px',
      fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
      
   }, 
   homeContainer: {
    display: 'flex',
    alignItems: 'top',
  },
  formBox: {
    border: '1px solid #ccc',
    padding: '21.9px',
    marginBottom: '10px',
    borderRadius: '15px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    width: '400px',
  },
  }

  return (
    <div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div style={styles.homeContainer}>
          <div style={styles.formBox}>
          <Link to="/HomeCustomer/CustomerTransfer" className="nav-item nav-link">  
            <h3 style={styles.h2}>Savings Account</h3>
        <h2 style={styles.h2}>₹ {getamountdata}</h2>
        </Link>
        </div>
        </div>
      )} {loadingl ? (
        <p>Loading...</p>
      ) : errorl ? (
        <p>Error: {error}</p>
      ) : (
        <div style={styles.homeContainer}>
          <div style={styles.formBox}>
          <Link to={`/HomeCustomer/ReportLoan?c=${gicid}`} className="nav-item nav-link">  
            <h3 style={styles.h2}>Loan Account</h3>
        <h2 style={styles.h2}>₹ {getLoandata}</h2>
        </Link>
        </div>
        </div>
      )}

  
    </div>
  );
};

export default HomeCustomer;
