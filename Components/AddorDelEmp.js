import React, { useRef, useState } from 'react';

const AddorDelEmp = () => {
    const [getemp, setemp] = useState('');
    const [isValid, setValid] = useState(null);
    const firstname = useRef();
    const lastname = useRef();
    const phone = useRef();
    const PAN = useRef();
    const Deptid = useRef();
    const [Panvalid,setPanvalid] =useState(null);
    const [detailsvalid,setdetailsvalid] = useState(null);

    const addemp = async () => {
        const pattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        const panCardValue = PAN.current.value.toUpperCase();
        const pancardvalid = pattern.test((panCardValue));
        setValid(pancardvalid);

    
        var jsonData = {
            "eFirstname": firstname.current.value,
            "eLastname": lastname.current.value,
            "phone": phone.current.value,
            "pan": PAN.current.value,
            "Deptid": Deptid.current.value,
        };

     

        if (!pancardvalid) {
            setPanvalid("Enter proper PAN card details");
            setdetailsvalid(null); // Clear other error message
            return;
        }
        
        if (Object.values(jsonData).some(value => value === '')) {
            setdetailsvalid('Please fill in all fields.');
            setPanvalid(null); // Clear PAN card error message
            return;
        }
        console.log(jsonData)
        try {
            const response = await fetch(`https://localhost:7273/api/manageraddemp`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
            });

            const userdata = await response.json();
            console.log(userdata);

            if (userdata === 1) {
                console.log("Employee added successfully");
                setemp("Employee added successfully");
            } else {
                console.log("Check the credentials again and fill them");
                setemp("Check the credentials again and fill them");
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
          width: '400px',
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
            <label style={styles.label}>Enter firstname </label>
            <input type="text" style={styles.input} ref={firstname} className='form-control' />

            <label style={styles.label}>Enter lastname </label>
            <input type="text" style={styles.input} ref={lastname} className='form-control' />

            <label style={styles.label}>Enter Phone </label>
            <input type="text" style={styles.input} ref={phone} className='form-control' />

            <label style={styles.label}>Enter PAN </label>
            <input type="text" style={styles.input} ref={PAN} className='form-control' />

            <label style={styles.label} >Enter Deptid </label>
            <select style={styles.input} ref={Deptid} >
                <option style={styles.label} value="150">savings</option>
                <option style={styles.label} value="160" >loan</option>
            </select>

            <label style={styles.label}>{getemp}</label> <br />
            <input type='button' style={styles.button} value='Add Employee' onClick={addemp} />
         <label style={styles.label}>  {Panvalid}
            {detailsvalid}</label> 
            </div>
        </div>
    );
};

export default AddorDelEmp;
