import React, { useRef, useState } from 'react';

const PAN = () => {
  const [isValid, setValid] = useState(null);
  const [panNumber, setPanNumber] = useState('');


  const panCheck = async () => {
    const pattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const pancardvalid = pattern.test(panNumber);
    setValid(pancardvalid)
if(pancardvalid){
    const jsonData ={
      "PAN":panNumber
    }
  
    try {
      
      const response = await fetch('https://localhost:7273/api/pancheck', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
        
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Success:', data);
        // Handle the response data here
      } else {
        console.log('Error:', data);
        // Handle the error response here
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error here
    }
  }else{
    setValid(false)
  }
}

  return (
    <div>
      <label>Enter PAN</label>
      <input type="text" onChange={(e)=> setPanNumber(e.target.value)} className="form-control" />
      <button onClick={panCheck}>Search</button>
      {isValid !== null && (
        <p>
          {isValid
            ? `The PAN number ${panNumber} is valid.`
            : `The PAN number ${panNumber} is not valid.`}
            </p>
      )}
    </div>
  );
};

export default PAN;
