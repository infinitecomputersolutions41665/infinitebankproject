import React, { useEffect } from 'react';
 
const Logout = () => {

        sessionStorage.clear();
        const styles={
            label: {
                fontSize: '16px',
                color: 'green',
              },  
                homeContainer: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                marginTop:'100px',
              },
              formBox: {
                border: '1px solid #ccc',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                width: '100%',
                marginBottom: '100px',
                marginLeft: '100px',
                marginRight: '100px',
              },
              heading:{
                fontSize: '30px',
              }
        }

    return (
        <div>
               <div style={styles.homeContainer}>
        <div style={styles.formBox}>
             <label style={styles.heading}>Thanks for using our services.... </label>  <br/>  
           <a style={styles.label} href="/Login">Click here to login again</a>
           </div>
           </div>
        </div>
    );
};
 
export default Logout