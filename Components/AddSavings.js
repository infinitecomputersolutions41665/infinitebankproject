import React, { useEffect, useRef, useState } from 'react';

const AddSavings = () => {
  const [getSavings, setSavings] = useState('');
  const cfirstname = useRef();
  const clastname = useRef();
  const phone = useRef();
  const DOB = useRef();
  const PAN = useRef();
  const Salary = useRef();
  const userid = useRef();
  const [isValid, setValid] = useState(null);
  const [Panvalid,setPanvalid] =useState(null);
  const[age,setage] = useState(null);
  const today = new Date();
  const[message,setmessage] = useState();

useEffect(() => {
  // This effect runs once when the component mounts
  setPanvalid('');
  setage('');
  setmessage('');

}, []);
  const savings = async () => {
    var jsonData = {
      "cfirstname": cfirstname.current.value,
      "clastname": clastname.current.value,
      "phone": phone.current.value,
      "DOB": DOB.current.value,
      "PAN": PAN.current.value,
      "Salary": Salary.current.value,
      "userid": userid.current.value,
    };
    const birthDate = new Date(DOB.current.value);
    const ageDifference = today.getFullYear() - birthDate.getFullYear();
 
    if (Object.values(jsonData).some(value => value === '')) {
      setmessage('Please fill in all fields.');
      return;
    }

    if (ageDifference < 18 || (ageDifference === 18 && today.getMonth() < birthDate.getMonth()) || (ageDifference === 18 && today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      setage("Minimum age is 18");
      return;
    }
const pattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const panCardValue = PAN.current.value.toUpperCase();
const pancardvalid = pattern.test((panCardValue));
setValid(pancardvalid);
if (!pancardvalid) {
  setPanvalid("Enter proper PAN card details");
  return;
}
    try {
      const response = await fetch(`https://localhost:7273/api/empaddsav`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      const userdata = await response.text();
      if (userdata === "2") {
        setSavings("Successfully account has been created");
      } else {
        setSavings("Unable to create an account for you");
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
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
      color: 'green', // Adjust color as needed
    },
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>Enter First Name</label>
      <input type="text" ref={cfirstname} style={styles.input} />

      <label style={styles.label}>Enter Last Name</label>
      <input type="text" ref={clastname} style={styles.input} />

      <label style={styles.label}>Enter Phone</label>
      <input type="text" ref={phone} style={styles.input} />

      <label style={styles.label}>Enter DOB</label>
      <input type="date" ref={DOB} style={styles.input} />

      <label style={styles.label}>Enter PAN</label>
      <input type="text" ref={PAN} style={styles.input} />

      <label style={styles.label}>Enter Salary</label>
      <input type="text" ref={Salary} style={styles.input} />

      <label style={styles.label}>Enter User ID</label>
      <input type="text" ref={userid} style={styles.input} />

      <input type='button' value='Submit' onClick={savings} style={styles.button} />
      <label style={styles.result}>{getSavings}</label>
      <label style={styles.label}>{message}</label>
      <label style={styles.label}>{age}</label>
      <label style={styles.label}>{Panvalid}</label>
    </div>
  );
};

export default AddSavings;
