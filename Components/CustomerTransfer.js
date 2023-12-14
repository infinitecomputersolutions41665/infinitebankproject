import React, { useRef, useState, useEffect } from 'react';

const CustomerTransfer = () => {
    const [customerId, setCustomerId] = useState('');
    const [error, setError] = useState(null);
    const [transferMessage, setTransferMessage] = useState('');
    const fromaccid = JSON.parse(sessionStorage.getItem("userdata"));
    const toaccid = useRef();
    const amount = useRef();

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

    const transfer = async () => {
        try {
            const jsonData = {
                "saccid": parseInt(toaccid.current.value),
                "transamt": parseFloat(amount.current.value),
            };

            if (Object.values(jsonData).some(value => value === '')) {
                setTransferMessage('Please fill in all fields.');
                return;
            }

        

            const response = await fetch(`https://localhost:7273/api/transfer/${fromaccid.savingsid}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
            });

            if (response.ok) {
                const userdata = await response.json();
                console.log(userdata)
                if (userdata === 4) {
                    setTransferMessage('Transfer successful. Amount transferred to the specified account.');
                } else if(userdata ===0) {
                    setTransferMessage('Transfer failed. Insufficient funds');
                }
                else if(userdata ===2){
                    setTransferMessage('Transfer failed. Invalid source account');
                }
            } else {
                throw new Error('API request failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setTransferMessage('Transfer failed. An error occurred during the transfer process.');
        }
    };

    useEffect(() => {
        fetchDataFromUrl();
    }, []); // Empty dependency array to ensure it runs only once on component mount
    const styles = {
        homeContainer: {
          display: 'flex',
          alignItems: 'center',
          marginBottom:'10px'
        },
        formBox: {
          border: '1px solid #ccc',
          padding: '20px',
          marginBottom: '50px',
          borderRadius: '15px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
          width: '700px',
        },
        label: {
          textShadow: '3px 2px 2px #ecf5fd',
          color: '#333',
          fontSize: 'larger',
          fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
        },
        tabContainer: {
          display: 'flex',
          marginBottom: '10px',
        },
        tab: {
          border: '1px solid black',
          borderRadius: '10px',
          padding: '8px',
          paddingTop: '1px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        hiddenRadio: {
          position: 'absolute',
          opacity: '0',
        },
        button: {
          backgroundColor: 'teal', /* Navy Blue Button */
          color: '#fff', /* White Text */
          fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '6px',
          marginBottom:'6px',
          width:'100px',
    
        },
        result: {
            marginTop: '20px',
            fontWeight: 'bold',
          },
      };




    return (
        <div>
              <div style={styles.homeContainer}>
                <div style={styles.formBox}>
            <div style={styles.homeContainer}>
                <div style={styles.formBox}>
            <label style={styles.label}>from account: <br/>{fromaccid.savingsid} </label>
            </div>
            </div>
            <div style={styles.homeContainer}>
                <div style={styles.formBox}>
            <label style={styles.label}>To account: <br/> </label>
            <input type='text' ref={toaccid}></input>
            </div>
            </div>

            <label style={styles.label}>enter amount </label>
            <input type="text" ref={amount} className='form-control' />

            <input type='button' style={styles.button} onClick={transfer} value='Submit' />

            <div style={styles.result}>{transferMessage && <p>{transferMessage}</p>}</div>
            </div>
            </div>
        </div>
    );
};

export default CustomerTransfer;
