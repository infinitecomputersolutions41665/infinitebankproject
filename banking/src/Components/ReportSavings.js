import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ReportSavings = () => {
  const [getSavings, setSavings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const qp = new URLSearchParams(window.location.search);
  const [gicid, setcid] = useState(qp.get("c"));
  const cid = useRef('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]); // Include searchQuery in the dependency array

  const fetchData = async () => {
    const url = `https://localhost:7273/api/managerallreportsavingacc`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.$values);
      setSavings(data.$values);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    // Check if cid.current is defined before accessing trim
    setSearchQuery(cid.current?.value?.trim() || '');
  };

  const filteredSavings = getSavings.filter((savings) =>
  savings.cid && savings.cid.toString() === gicid
);
  const renderSavings = () => {
    if (filteredSavings.length === 0) {
      return <p>No matching savings found.</p>;
    }

    return (
      <div style={styles.homeContainer}>
        <div style={styles.formBox}>
          {filteredSavings.map((savings, index) => (
            <div key={index}>
              <label style={styles.label}>Savings Account ID: {savings.saccid}</label><br />
              <label style={styles.label}>Customer ID: {savings.cid}</label><br />
              <label style={styles.label}>Balance Amount: {savings.balanceamt}</label><br />
              <Link to={`/HomeCustomer/SavingTrans?savingsid=${savings.saccid}`} className="btn btn-info" style={styles.button}>
                Savings Transactions
              </Link>
             
            </div>
          ))}
        </div>
      </div>
    );
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
      width: '500px',
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
      width: '300px',
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
      <h3 style={styles.heading}>Savings Account Details:</h3>
      {renderSavings()}
    </div>
  );
};

export default ReportSavings;
