import React, { useRef, useState } from 'react';

const INTEREST_RATES = {
  12: 10,
  24: 9.5,
  36: 9,
};

const AddLoan = () => {
  const [getLoan, setLoan] = useState('');
  const [monthlyEMI, setMonthlyEMI] = useState(null);
  const customerIdRef = useRef();
  const loanAmountRef = useRef();
  const tenureRef = useRef();
  const emiPlanRef = useRef();

  const calculateEMI = (loanAmount, monthlyInterestRate, numberOfInstallments) => {
    return (
      loanAmount *
      monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfInstallments))
    );
  };

  const Loan = async () => {
    const customerId = parseFloat(customerIdRef.current.value);
    const loanAmount = parseFloat(loanAmountRef.current.value);
    const selectedTenure = parseFloat(tenureRef.current.value);
    const selectedEmiPlan = emiPlanRef.current.value;

    if ([customerId, loanAmount, selectedTenure, selectedEmiPlan].some(value => !value)) {
      setLoan('Please fill in all fields.');
      return;
    }

    if (loanAmount < 10000) {
      setLoan('Minimum loan amount is $10,000');
      return;
    }

    let interestRate = INTEREST_RATES[selectedTenure];
    let monthlyInterestRate = interestRate / 100 / 12;
    let numberOfInstallments = selectedTenure;

    if (selectedTenure === 12) {
      interestRate = 10;
    } else if (selectedTenure === 24) {
      interestRate = 9.5;
    } else if (selectedTenure === 36) {
      interestRate = 9;
    }

    let emiPayAmount = calculateEMI(loanAmount, monthlyInterestRate, numberOfInstallments);

    setMonthlyEMI(emiPayAmount);

    const jsonData = {
      Cid: customerId,
      lnamt: loanAmount,
      tenure: selectedTenure,
      rateofintrest: interestRate,
      emi: emiPayAmount.toFixed(2),
    };

    try {
      const response = await fetch(
        `https://localhost:7273/api/manageraddloanacc`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData),
        }
      );

      const userdata = await response.json();

      if (userdata === 2) {
        setLoan('Loan is created successfully');
      } else {
        setLoan('Failed to create a loan. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setLoan('Loan submission failed. An error occurred.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '200px',
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
      color: 'green',
    },
  };

  return (
    <div>
      <div style={styles.container}>
        <label style={styles.label}>Enter customer account ID:</label>
        <input type="text" style={styles.input} ref={customerIdRef} className="form-control" />

        <label style={styles.label}>Enter loan amount:</label>
        <input type="text" style={styles.input} ref={loanAmountRef} className="form-control" />

        <label style={styles.label}>Select loan tenure:</label>
        <select style={styles.input} ref={tenureRef} className="form-control">
          <option value="12">1 year & interestRate = 10</option>
          <option value="24">2 years & interestRate = 9.5</option>
          <option value="36">3 years & interestRate = 9</option>
        </select>

        <label style={styles.label}>Select EMI plan:</label>
        <select ref={emiPlanRef} style={styles.input} className="form-control">
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Half-Yearly">Half-Yearly</option>
          <option value="Yearly">Yearly</option>
        </select>

        <label style={styles.label}>{getLoan}</label>

        {monthlyEMI !== null && monthlyEMI !== undefined && (
          <p>Monthly EMI: ${monthlyEMI.toFixed(2)}</p>
        )}
        <input type="button" style={styles.button} onClick={Loan} value="Submit" />
      </div>
    </div>
  );
};

export default AddLoan;
