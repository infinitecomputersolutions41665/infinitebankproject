import React, { useEffect, useRef, useState } from 'react';

const LoanPay = () => {
  const [getLoan, setLoan] = useState();
  const Saccid = JSON.parse(sessionStorage.getItem("userdata"));
  const qp = new URLSearchParams(window.location.search);
  const [loanid, setloanid] = useState(qp.get("loanid"));
  const [emi, setemi] = useState(null);
  const[error,setError] =useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  

  const loanpayment = async () => {
    const savingtrans = {
      "transamt": parseInt(emi),
      "saccid": parseInt(Saccid.savingsid),
    };

    try {
      const response = await fetch(`https://localhost:7273/api/loanpay/${loanid}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(savingtrans),
       
  
      });

      const userdata = await response.json();

      if (userdata === 4) {
        setLoan("Loan paid successfully !! thank you");
      } else if(userdata ===0) {
        setLoan("insufficient funds");
      }
      else if(userdata ===2){
        setLoan("account doesnot exist");
      }
      else{
        console.error('An error occurred:', error);

      }
    } catch (error) {
      console.error('An error occurred:', error);
      setLoan('Loan payment failed. An error occurred.');
    }
  };
  const fetchData = async () => {
    try {
      const url = `https://localhost:7273/api/EMI/${loanid}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setemi(data); 
    } catch (error) {
      setError("Error fetching customer data from the server");
      console.error(error);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      marginTop: '50px',
      marginLeft:'50px',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      width: '400px',
      margin: 'auto',
    },
    label: {
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    input: {
      marginBottom: '20px',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '100%',
    },
    button: {
      backgroundColor: 'teal',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '100%',
    },
    result: {
      marginTop: '20px',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}> Transaction Amount:</label>
      <label style={styles.label}>₹ {parseFloat(emi)}</label>
      <input type='button' value='Pay Loan' onClick={loanpayment} style={styles.button} />
      <label style={styles.result}>{getLoan}</label>
    </div>
  );
};

export default LoanPay;
