
import React, { useEffect, useRef, useState } from 'react';
 
const API_BASE_URL = 'https://localhost:7273/api/';
 
const DepositOrWD = () => {
  const [depositMessage, setDepositMessage] = useState('');
  const [withdrawalMessage, setWithdrawalMessage] = useState('');
  const Saccid = useRef();
  const transamt = useRef();
 
  useEffect(() => {
    // This effect runs once when the component mounts
    setDepositMessage('');
    setWithdrawalMessage('');
  }, []);
 
  const handleTransaction = async (apiEndpoint, successMessage, transactionType) => {
    const amount = parseFloat(transamt.current.value);
 
    if (amount < 1000) {
      setDepositMessage('');
      setWithdrawalMessage(`Minimum ${transactionType.toLowerCase()} amount is 1000`);
      return;
    } else {
      setWithdrawalMessage('');
    }
 
    const jsonData = {
      saccid: parseInt(Saccid.current.value),
      transamt: parseFloat(transamt.current.value),
    };
 
    try {
      const response = await fetch(`${API_BASE_URL}${apiEndpoint}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });
 
      const userData = await response.text();
 
      if (userData === "2") {
        console.log('Transaction successful');
        setWithdrawalMessage('');
        setDepositMessage(successMessage);
      } else if(userData ==="0") {
        console.log('Transaction failed');
        setDepositMessage('');
        setWithdrawalMessage(`Failed to ${transactionType.toLowerCase()}. insufficient funds Please try again.`);
      }else if(userData ==="10"){
        setDepositMessage('');
        setWithdrawalMessage(`Failed to ${transactionType.toLowerCase()}. account doesnot exist Please try again.`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setWithdrawalMessage(`Error: ${error.message}. Please try again.`);
      setDepositMessage('');
    }
  };
 
  const deposit = () => {
    handleTransaction('empdeposit', 'Deposited successfully', 'Deposit');
  };
 
  const withdraw = () => {
    handleTransaction('empwithdraw', 'Withdrawal successful', 'Withdrawal');
  };
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft:'200px',
      marginTop: '20px',
    },
    label: {
      fontSize: '16px',
      margin: '5px 0',
    },
    input: {
      width: '400px',
      padding: '8px',
      margin: '5px 0',
    },
    button: {
      backgroundColor: 'teal',
      color: '#fff',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '100px',
      marginTop: '20px',
    },
    result: {
      marginTop: '20px',
      fontWeight: 'bold',
      color: 'red', // Adjust color as needed
    },
  };

  return (
    <div>
      <div style={styles.container}>
      <label style={styles.label}>Enter savings id</label>
      <input type="text" style={styles.input} ref={Saccid} className="form-control" />
      <label style={styles.label}>Enter transaction amount</label>
      <input type="text" style={styles.input} ref={transamt} className="form-control" />
      <input type="button" style={styles.button} value="Deposit" onClick={deposit} />
      <input type="button" style={styles.button} value="Withdraw" onClick={withdraw} />
      <label style={styles.result}>{withdrawalMessage}</label>
      <label style={styles.result}>{depositMessage}</label>
      </div>
    </div>
  );
};
 
export default DepositOrWD;
 