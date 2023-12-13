import React, { useRef, useState } from 'react';

const ForgotPassword = () => {
    const username =useRef(null);
    const password = useRef(null);
    const [get,set] = useState(null);
    const forgot =async () =>
    {
        var jsonData=
        {
            "userid":username.current.value,
            "password":password.current.value
        };
        try{
        const response = await fetch(`https://localhost:7273/api/forgotpassword`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData),
          });
if(response.ok){
    const userdata = await response.json();
    console.log(userdata)
    if(userdata== 1){
        set("password updated successfully");
    }else{
        set("incorrect credentials");
    }
}
        }catch(error){
            console.error(error);
        }
    }

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
            <label style={styles.label}>enter username</label>
            <input type='text' style={styles.input} ref={username} ></input><br/>
            <label style={styles.label}>enter password</label>
            <input type='text' style={styles.input} ref={password} ></input><br/>

            <input type='button' style={styles.button} value="submit" onClick={forgot}></input>
            {get}
            </div>
        </div>
    );
};

export default ForgotPassword;