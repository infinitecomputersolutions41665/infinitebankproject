import React, { useRef, useState } from 'react';

const DelLoan = () => {
    const savingid = useRef();
    const[message,setmessage]= useState();
    const  DeleteLoan= async ()=>
    {      
        var jsonData ={      
            "saccid": (savingid.current.value)}
            try{
  const response= await fetch('https://localhost:7273/api/Managerdelloanacc',
    {  
    method: 'put',
    headers: { 'Content-Type': 'application/json'},         
    body:JSON.stringify(jsonData),         
   })
   
   const userdata = await response.json();
   if(userdata ===1){
    setmessage("deleted loan succesfully")
   }else{
    setmessage("unable to delete loan succesfully")
   }
  }catch (error) {
    console.error('An error occurred:', error);
setmessage('An error occurred:', error) 
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
            <label style={styles.label} >enter savings account id </label>
            <input type="text" style={styles.input} ref={savingid} className='form-control'  />
            <input type='button' style={styles.button} onClick={DeleteLoan} value='delete'></input>
            <label style={styles.label}>{message}</label>

            </div>
        </div>
    );
};

export default DelLoan;