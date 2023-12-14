import React, { useEffect, useState } from 'react';

const SavingTrans = () => {
  const [savingsData, setSavingsData] = useState([]);
  // Saccid = JSON.parse(sessionStorage.getItem('userdata'));
  const Saccid = new URLSearchParams(window.location.search)
  var [savingsid,setsavingsid] = useState(Saccid.get("savingsid"));

  useEffect(() => {
    fetchData();
  }, []);

 
  const fetchData = async () => {
    const url = `https://localhost:7273/api/savingtransactions/${savingsid}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setSavingsData(data.$values);
    } catch (error) {
      console.error(error);
      // Add error handling or display an error message to the user
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
      padding: '15px',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      width: '80%',
      marginBottom: '100px',
      marginLeft: '100px',
      marginRight: '100px',
    },   
      formBox1: {
      border: '1px solid #ccc',
      paddingLeft:'10px',
      paddingTop:'5px',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      width: '100%',
    
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
    label1: {
      fontSize: '16px',
      color: '#666',
      marginLeft:'600px',
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
    status: (transtype) => ({
      fontSize: '16px',
      color: transtype==='cr' ? 'green' : 'red',
    }),
    arrow: {
      fontSize: '20px',
      marginLeft: '2px', 
      fontWeight: 'bold', 
    },
  };
  return (
    <div>
       <div style={styles.homeContainer}>
            <div style={styles.formBox}>
              <h3 style={styles.heading}>Statment: </h3>

            {savingsData.map((trans, index) => (             
              <label key={index}>
                   <div style={styles.homeContainer}>
                 <div style={styles.formBox1}>
                <label style={styles.subheading}>from:{trans.saccid}</label>
                <label style={styles.label1}>
                  <span style={styles.status(trans.transtype)}> 
                  {trans.transtype}
                <span style={styles.arrow}>{trans.transtype === 'cr' ? '😁' : trans.transtype === 'dr' ? '😭' : ''}
                </span></span></label>
                <label style={styles.label}>Transaction Date : {trans.transdate}</label><br/>
                <label style={styles.label}>₹ {trans.transamt}</label><br/>
                </div>
              </div>
              <br/>
              <hr/>
              </label>              
            ))}
            </div>
            </div>
            

         
    </div>
  );
};

export default SavingTrans;
