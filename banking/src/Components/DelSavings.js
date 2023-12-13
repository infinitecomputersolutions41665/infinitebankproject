import React, { useRef, useState } from 'react';

const DelSavings = () => {
    
const savingsaccid = useRef();
const [message,setmessage] = useState(null);

    const  delsavinng = async ()=>{
        {
            var jsonData ={      
                "saccid": parseInt(savingsaccid.current.value)                  
                }
                console.log(jsonData)
            try{
                
           const response = await fetch(`https://localhost:7273/api/delsavingacc`, {
                  method: 'put',
                  headers: { 'Content-Type': 'application/json'},         
                  body:JSON.stringify(jsonData),         
                 })                                                 
                     const userdata =  await response.json() 
                      console.log(userdata)
                    if(userdata === 1)
                    {                                                                       
                         setmessage("account deleted successfully")
                    }               
                    else
                    {
                      setmessage("unable to delete account")
                    }

                } catch (error) {
                    console.error('An error occurred:', error);
                    alert('Login failed. An error occurred.');
                  }
                
        }                   
        }
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
              padding: '3px',
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
            <label style={styles.label}>enter savings account id </label>
            <input style={styles.input} type="text" ref={savingsaccid} className='form-control'  />
            <input type='button' value='submit' style={styles.button} onClick={delsavinng}></input>
            <label style={styles.label}>{message}</label>
            </div>
        </div>
    );
};

export default DelSavings;