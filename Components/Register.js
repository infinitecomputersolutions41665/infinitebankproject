import React, { useRef, useState } from 'react';

const Register = () => {
  const id = useRef();
  const username = useRef();
  const password = useRef();
  const[getresult,setresult] = useState(null);


  const register = async () => {
    const userData = {
      "id": parseInt(id.current.value),
      "userid": username.current.value,
      "password": password.current.value,
    };

    try {
      const response = await fetch(`https://localhost:7273/api/emplogin`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json(); // Parse response as JSON
       console.log(result)
        if (result === 1) {
          setresult("Registration successfull..!!");
        } else {
          setresult("user already exists..!!");
        }
      } else {
        setresult("Registration failed. An error occurred.");
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setresult('Registration failed. An error occurred.');
    }
  };
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft:'400px',
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
      color: 'green', // Adjust color as needed
    },
  };

  return (
    <div>
      <div style={styles.container}>
      <label style={styles.label}>Enter employee/customer ID</label>
      <input type="text" style={styles.input} ref={id} className='form-control' />
      <label style={styles.label}>Enter user id</label>
      <input type="text" style={styles.input} ref={username} className='form-control' />
      <label style={styles.label}>Enter password</label>
      <input type="text" style={styles.input} ref={password} className='form-control' />
      <input type='button' style={styles.button} value='Register' onClick={register} />
      <label style={styles.label}>{getresult}</label>
      </div>
    </div>
  );
};

export default Register;
