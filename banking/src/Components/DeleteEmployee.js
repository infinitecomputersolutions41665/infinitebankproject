import React, { useRef, useState } from 'react';

const DeleteEmployee = () => {
    const empid = useRef();
const[message,setmessage] = useState();
    const  Deleteemp = async ()=>
    {      
        var jsonData ={      
            "eid": (empid.current.value)}
            try{
            if (Object.values(jsonData).some(value => value === '')) {
                alert('Please fill in all fields.');
                return;
            }
   const response =await fetch('https://localhost:7273/api/managerdelemp',
    {  
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},         
    body:JSON.stringify(jsonData),         
   })
   
  const userdata = await response.json()
  console.log(userdata);
  if(userdata ===1){
   setmessage("employee deleted successfully")
  }else{
    setmessage("unable to delete employee .. invalid credentials")

  }
  }catch(error){
     console.error(error);
   };
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
            <label style={styles.label}>Employee id</label>
             <input type='text' style={styles.input} ref={empid}></input>
            <input type="button" style={styles.button}  value="Submit" className='btn btn-info' onClick={Deleteemp}/> 
           <label style={styles.label}>{message}</label>
            </div>
        </div>
    );
};

export default DeleteEmployee;